# VTPA Payroll System

Hệ thống tạo bảng lương cho Công ty Cổ phần 27-7 Hồng Quang (VTPA).

## 🚀 Demo Online

- **Frontend**: https://btbinh2710.github.io/vtpa-payroll/
- **Backend**: https://vtpa-payroll.onrender.com

## Cấu trúc dự án

```
VTPA_Payroll/
├── index.html          # File HTML chính
├── css/
│   └── style.css       # File CSS tùy chỉnh
├── js/
│   └── script.js       # File JavaScript chính
├── server.js           # Backend server (Node.js)
├── package.json        # Dependencies
├── render.yaml         # Render.com deployment config
├── logo.jpg            # Logo công ty
├── DejaVuSans.ttf      # Font chữ cho PDF
└── README.md           # File hướng dẫn này
```

## Tính năng chính

### 1. Nhập thủ công
- Nhập thông tin nhân viên từng người
- Tính toán lương tự động
- Xem trước bảng lương
- Xuất PDF

### 2. Upload Excel
- Import dữ liệu từ file Excel
- Xử lý hàng loạt nhiều nhân viên
- Tải template Excel mẫu

### 3. Gửi Email (Online Backend)
- Backend deploy trên Render.com
- Cấu hình SMTP (Gmail/Office 365)
- Gửi bảng lương qua email
- Test kết nối email

### 4. Cài đặt
- Cấu hình thông tin công ty
- Thiết lập email server

## Cách sử dụng

### Bước 1: Mở ứng dụng
Mở file `index.html` trong trình duyệt web hoặc truy cập demo online.

### Bước 2: Chọn chế độ nhập liệu
- **Nhập thủ công**: Nhập từng nhân viên một
- **Upload Excel**: Import file Excel có nhiều nhân viên
- **Gửi Email**: Cấu hình và gửi email
- **Cài đặt**: Thiết lập hệ thống

### Bước 3: Nhập thông tin nhân viên
- Họ và tên
- Mã nhân viên
- Bộ phận/Chi nhánh
- Chức vụ
- Email
- Ngày công thực tế
- Mức lương cơ bản
- Tỷ lệ hưởng lương
- Các khoản thu nhập khác
- Các khoản khấu trừ

### Bước 4: Tính toán và xuất
- Nhấn "Tính toán" để tính lương
- Nhấn "Xem trước" để xem bảng lương
- Nhấn "Xuất PDF" để tải file PDF
- Nhấn "📧" để gửi email

## Cấu trúc file Excel

File Excel cần có các cột sau:
- Họ và tên
- Mã nhân viên
- Bộ phận
- Chức vụ
- Email
- Ngày công thực tế
- Mức lương
- Tỷ lệ hưởng
- Số xe ký
- Lương tăng ca
- Thưởng
- Phụ cấp ăn
- Phụ cấp trách nhiệm
- BHXH
- Khấu trừ ăn
- Khấu trừ qui chế
- Thuế TNCN
- Khấu trừ khác

## Công thức tính lương

1. **Lương thực tế** = (Mức lương × Tỷ lệ hưởng) × (Ngày công thực tế ÷ 24)
2. **Tổng thu nhập** = Lương thực tế + Lương tăng ca + Thưởng + Phụ cấp ăn + Phụ cấp trách nhiệm
3. **Tổng khấu trừ** = BHXH + Khấu trừ ăn + Khấu trừ qui chế + Thuế TNCN + Khấu trừ khác
4. **Thực lĩnh** = Tổng thu nhập - Tổng khấu trừ

## Backend API

### Endpoints
- `GET /health` - Health check
- `POST /api/test-connection` - Test SMTP connection
- `POST /api/send-email` - Send email

### Cấu hình SMTP
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Yêu cầu hệ thống

- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Kết nối internet để tải các thư viện CDN và backend API
- Quyền ghi file để tải PDF

## Thư viện sử dụng

### Frontend
- **Tailwind CSS**: Framework CSS
- **Font Awesome**: Icon
- **SheetJS**: Xử lý file Excel
- **jsPDF**: Tạo file PDF
- **html2canvas**: Chuyển đổi HTML sang hình ảnh

### Backend
- **Express.js**: Web server
- **Nodemailer**: Gửi email
- **CORS**: Cross-origin requests
- **dotenv**: Environment variables

## Deploy

### Frontend (GitHub Pages)
1. Push code lên GitHub
2. Enable GitHub Pages trong repository settings
3. Chọn branch main và folder root

### Backend (Render.com)
Xem chi tiết tại file `DEPLOY.md`

## Hỗ trợ

Nếu có vấn đề hoặc cần hỗ trợ, vui lòng liên hệ:
- Email: support@vtpa.com
- Hotline: 0902279898

## Phiên bản

- Version: 2.0.0
- Ngày cập nhật: 20/06/2025
- Tác giả: VTPA Development Team 