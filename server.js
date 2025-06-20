const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// API gửi email
app.post('/send-email', async (req, res) => {
    const { smtpHost, smtpPort, smtpUser, smtpPass, to, subject, html } = req.body;

    try {
        // Tạo transporter
        let transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort == 465, // true for 465, false for other ports
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });

        // Gửi email
        let info = await transporter.sendMail({
            from: smtpUser,
            to,
            subject,
            html
        });

        res.json({ success: true, message: 'Đã gửi email thành công!', info });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi gửi email', error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Email backend running at http://localhost:${PORT}`);
}); 