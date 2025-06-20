require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Tạo transporter với biến môi trường
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'hanhchinh2@vinfastphantrongtue.com',
    pass: process.env.EMAIL_PASS || '1234567Vf@',
  },
});

// API gửi email
app.post('/send-email', async (req, res) => {
    const { to, subject, html } = req.body;

    try {
        // Gửi email
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        });

        res.json({ success: true, message: 'Đã gửi email thành công!', info });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi gửi email', error: error.message });
    }
});

// API test kết nối SMTP
app.post('/test-connection', async (req, res) => {
    try {
        await transporter.verify();
        res.json({ success: true, message: 'Kết nối SMTP thành công!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi kết nối SMTP', error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Email backend running at http://localhost:${PORT}`);
    console.log(`SMTP Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}`);
    console.log(`Email User: ${process.env.EMAIL_USER || 'hanhchinh2@vinfastphantrongtue.com'}`);
});
