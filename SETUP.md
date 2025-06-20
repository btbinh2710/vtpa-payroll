# Hướng dẫn cài đặt và chạy Backend Email

## Bước 1: Cài đặt Node.js
Đảm bảo bạn đã cài đặt Node.js (phiên bản 14 trở lên).
Tải từ: https://nodejs.org/

## Bước 2: Cài đặt dependencies
```bash
npm install
```

## Bước 3: Tạo file .env
Tạo file `.env` trong thư mục gốc với nội dung:
```env
# SMTP Configuration
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=hanhchinh2@vinfastphantrongtue.com
EMAIL_PASS=1234567Vf@

# Server Configuration
PORT=3001
```

## Bước 4: Chạy backend
```bash
npm start
```
hoặc
```bash
node server.js
```

Backend sẽ chạy tại: `http://localhost:3001`

## Bước 5: Mở frontend
Mở file `index.html` trong trình duyệt web.

## Kiểm tra hoạt động

1. **Test kết nối SMTP:**
   - Vào tab "Cài đặt"
   - Nhấn "Test kết nối"
   - Nếu thành công sẽ hiện thông báo "Kết nối email thành công!"

2. **Gửi email:**
   - Nhập thông tin nhân viên có email
   - Nhấn nút "📧" để gửi email
   - Email sẽ được gửi thực sự tới địa chỉ email của nhân viên

## Cấu hình SMTP khác

Nếu muốn dùng Gmail:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Lưu ý:** Với Gmail, bạn cần tạo "App Password" thay vì dùng mật khẩu thường.

## Troubleshooting

1. **Lỗi "ECONNREFUSED":**
   - Đảm bảo backend đang chạy
   - Kiểm tra port 3001 không bị chiếm

2. **Lỗi SMTP:**
   - Kiểm tra thông tin SMTP trong file .env
   - Đảm bảo email và mật khẩu đúng
   - Với Office 365, có thể cần bật "Less secure app access"

3. **Lỗi CORS:**
   - Backend đã được cấu hình CORS
   - Nếu vẫn lỗi, kiểm tra URL trong frontend có đúng không 