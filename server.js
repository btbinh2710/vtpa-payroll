require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3000', 'https://btbinh2710.github.io', 'https://*.github.io'],
    credentials: true
}));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Tạo transporter với biến môi trường
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.office365.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER || 'hanhchinh2@vinfastphantrongtue.com',
            pass: process.env.EMAIL_PASS || '1234567Vf@',
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API gửi email
app.post('/api/send-email', async (req, res) => {
    console.log('📧 Email request received:', req.body);
    
    const { to, subject, html, text } = req.body;

    if (!to || !subject) {
        return res.status(400).json({ 
            success: false, 
            message: 'Thiếu thông tin email (to, subject)' 
        });
    }

    try {
        const transporter = createTransporter();
        
        // Gửi email
        const mailOptions = {
            from: process.env.EMAIL_USER || 'hanhchinh2@vinfastphantrongtue.com',
            to,
            subject,
            html: html || text,
            text: text || html
        };

        console.log('📤 Sending email to:', to);
        let info = await transporter.sendMail(mailOptions);

        console.log('✅ Email sent successfully:', info.messageId);
        res.json({ 
            success: true, 
            message: 'Đã gửi email thành công!', 
            messageId: info.messageId 
        });
    } catch (error) {
        console.error('❌ Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi gửi email: ' + error.message,
            error: error.toString()
        });
    }
});

// API test kết nối SMTP
app.post('/api/test-connection', async (req, res) => {
    console.log('🔌 Testing SMTP connection...');
    
    try {
        const transporter = createTransporter();
        await transporter.verify();
        
        console.log('✅ SMTP connection successful');
        res.json({ 
            success: true, 
            message: 'Kết nối SMTP thành công!',
            config: {
                host: process.env.SMTP_HOST || 'smtp.office365.com',
                port: process.env.SMTP_PORT || 587,
                user: process.env.EMAIL_USER || 'hanhchinh2@vinfastphantrongtue.com'
            }
        });
    } catch (error) {
        console.error('❌ SMTP connection failed:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi kết nối SMTP: ' + error.message,
            error: error.toString()
        });
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Lỗi server: ' + err.message 
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'API endpoint không tồn tại' 
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 VTPA Payroll Backend running on port ${PORT}`);
    console.log(`📧 SMTP Host: ${process.env.SMTP_HOST || 'smtp.office365.com'}`);
    console.log(`👤 Email User: ${process.env.EMAIL_USER || 'hanhchinh2@vinfastphantrongtue.com'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
