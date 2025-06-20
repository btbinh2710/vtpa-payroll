# VTPA Payroll System

Hệ thống tạo bảng lương cho Công ty Cổ phần 27-7 Hồng Quang (VTPA).

## Cấu trúc dự án

```
VTPA_Payroll/
├── index.html          # File HTML chính
├── css/
│   └── style.css       # File CSS tùy chỉnh
├── js/
│   └── script.js       # File JavaScript chính
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

### 3. Gửi Email
- Cấu hình SMTP
- Gửi bảng lương qua email
- Test kết nối email

### 4. Cài đặt
- Cấu hình thông tin công ty
- Thiết lập email server

## Cách sử dụng

### Bước 1: Mở ứng dụng
Mở file `index.html` trong trình duyệt web.

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

## Yêu cầu hệ thống

- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Kết nối internet để tải các thư viện CDN
- Quyền ghi file để tải PDF

## Thư viện sử dụng

- **Tailwind CSS**: Framework CSS
- **Font Awesome**: Icon
- **SheetJS**: Xử lý file Excel
- **jsPDF**: Tạo file PDF
- **html2canvas**: Chuyển đổi HTML sang hình ảnh

## Hỗ trợ

Nếu có vấn đề hoặc cần hỗ trợ, vui lòng liên hệ:
- Email: support@vtpa.com
- Hotline: 0902279898

## Phiên bản

- Version: 1.0.0
- Ngày cập nhật: 20/06/2025
- Tác giả: VTPA Development Team 