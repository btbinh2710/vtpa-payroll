# Hướng dẫn Deploy Backend Online

## 🚀 Deploy trên Render.com (Miễn phí)

### Bước 1: Chuẩn bị
1. Tạo tài khoản tại [Render.com](https://render.com)
2. Đảm bảo code đã được push lên GitHub

### Bước 2: Deploy trên Render
1. Đăng nhập vào Render Dashboard
2. Click "New +" → "Web Service"
3. Connect với GitHub repository
4. Chọn repository VTPA_Payroll

### Bước 3: Cấu hình
- **Name**: `vtpa-payroll-backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

### Bước 4: Environment Variables
Thêm các biến môi trường:
```
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=hanhchinh2@vinfastphantrongtue.com
EMAIL_PASS=your-email-password
```

### Bước 5: Deploy
Click "Create Web Service" và chờ deploy hoàn tất.

## 🔧 Cấu hình Email

### Gmail SMTP
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Lưu ý**: Với Gmail, bạn cần:
1. Bật "2-Step Verification"
2. Tạo "App Password" tại Google Account Settings
3. Sử dụng App Password thay vì mật khẩu thường

### Office 365 SMTP
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-password
```

## 🌐 Test Backend

### Health Check
```
GET https://your-app-name.onrender.com/health
```

### Test Email
```
POST https://your-app-name.onrender.com/api/test-connection
```

### Send Email
```
POST https://your-app-name.onrender.com/api/send-email
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "html": "<h1>Test</h1>"
}
```

## 🔗 Cập nhật Frontend

Sau khi deploy thành công, cập nhật URL trong `js/script.js`:

```javascript
const BACKEND_URL = 'https://your-app-name.onrender.com';
```

## 📊 Monitoring

- **Logs**: Xem logs tại Render Dashboard
- **Health Check**: `/health` endpoint
- **Uptime**: Render cung cấp uptime monitoring

## 🚨 Troubleshooting

### Lỗi thường gặp:
1. **Build Failed**: Kiểm tra `package.json` và dependencies
2. **SMTP Error**: Kiểm tra email/password và SMTP settings
3. **CORS Error**: Backend đã được cấu hình CORS cho GitHub Pages
4. **Timeout**: Render free plan có timeout 30s

### Debug:
1. Kiểm tra logs tại Render Dashboard
2. Test API endpoints với Postman
3. Kiểm tra environment variables

## 🔄 Auto Deploy

Render sẽ tự động deploy khi có commit mới trên branch main.

## 💰 Chi phí

- **Free Plan**: Miễn phí, có giới hạn
- **Paid Plan**: $7/tháng cho unlimited resources 