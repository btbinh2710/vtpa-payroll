const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'hanhchinh2@vinfastphantrongtue.com',
    pass: '1234567Vf@',
  },
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'hanhchinh2@vinfastphantrongtue.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email đã được gửi: ' + info.response);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
