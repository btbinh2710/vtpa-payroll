console.log('🚀 VTPA Payroll System - Debug Mode Activated');

// Backend URL configuration
const BACKEND_URL = 'https://vtpa-payroll-backend.onrender.com'; // Online backend
// const BACKEND_URL = 'http://localhost:3001'; // Local backend (uncomment for local testing)

console.log('🔗 Backend URL:', BACKEND_URL);

// Global variables
let currentEmployeeData = null;
let employeesData = [];

// Utility functions
function showToast(message, type = 'success') {
    console.log(`📢 Toast: ${type} - ${message}`);
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

function showError(message) {
    console.error(`❌ Error: ${message}`);
    showToast(message, 'error');
}

function showSuccess(message) {
    console.log(`✅ Success: ${message}`);
    showToast(message, 'success');
}

function setButtonLoading(button, loading) {
    const spinner = button.querySelector('.loading-spinner');
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
        if (spinner) spinner.style.display = 'inline-block';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        if (spinner) spinner.style.display = 'none';
    }
}

// Tab switching
function initializeTabs() {
    console.log('🔧 Initializing tabs...');
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            console.log(`📑 Switching to tab: ${this.dataset.tab}`);
            
            // Update tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('bg-blue-500', 'text-white');
                btn.classList.add('text-gray-600');
            });
            this.classList.add('bg-blue-500', 'text-white');
            this.classList.remove('text-gray-600');
            
            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(`tab-${this.dataset.tab}`).style.display = 'block';
        });
    });
}

// Employee data collection
function getEmployeeData() {
    try {
        const baseSalary = parseInt(document.getElementById('baseSalary').value) || 0;
        const percentage = parseInt(document.getElementById('salaryPercentage').value) || 100;
        const workDays = parseInt(document.getElementById('workDays').value) || 0;
        
        // Calculate effective salary (applying percentage only to base salary)
        const effectiveSalary = baseSalary * (percentage / 100);
        const actualSalary = Math.min(effectiveSalary * (workDays / 24), effectiveSalary);
        
        const data = {
            fullName: document.getElementById('fullName').value || '',
            employeeId: document.getElementById('employeeId').value || '',
            department: document.getElementById('department').value || '',
            position: document.getElementById('position').value || '',
            email: document.getElementById('email').value || '',
            workDays: workDays,
            baseSalary: baseSalary,
            salaryPercentage: percentage,
            carsigned: parseInt(document.getElementById('carsigned').value) || 0,
            
            // Income (other than base salary - no percentage applied)
            actualSalary: actualSalary,
            overtime: parseInt(document.getElementById('overtime').value) || 0,
            bonus: parseInt(document.getElementById('bonus').value) || 0,
            mealAllowance: parseInt(document.getElementById('mealAllowance').value) || 0,
            responsibilityAllowance: parseInt(document.getElementById('responsibilityAllowance').value) || 0,
            
            // Deductions
            socialInsurance: parseInt(document.getElementById('socialInsurance').value) || 0,
            mealDeduction: parseInt(document.getElementById('mealDeduction').value) || 0,
            regulationDeduction: parseInt(document.getElementById('regulationDeduction').value) || 0,
            incomeTax: parseInt(document.getElementById('incomeTax').value) || 0,
            otherDeduction: parseInt(document.getElementById('otherDeduction').value) || 0
        };
        
        // Calculate totals
        data.totalIncome = data.actualSalary + data.overtime + data.bonus + data.mealAllowance + data.responsibilityAllowance;
        data.totalDeduction = data.socialInsurance + data.mealDeduction + data.regulationDeduction + data.incomeTax + data.otherDeduction;
        data.netSalary = data.totalIncome - data.totalDeduction;
        
        console.log('📊 Employee data collected:', data);
        return data;
    } catch (error) {
        console.error('❌ Error collecting employee data:', error);
        throw error;
    }
}

// Number formatting
function formatNumber(num) {
    return new Intl.NumberFormat('vi-VN').format(num);
}

function numberToWords(num) {
    // Simplified Vietnamese number to words conversion
    const units = ['', 'nghìn', 'triệu', 'tỷ'];
    const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    
    if (num === 0) return 'không đồng';
    
    let result = '';
    let unitIndex = 0;
    
    while (num > 0) {
        const chunk = num % 1000;
        if (chunk > 0) {
            let chunkText = '';
            
            const hundreds = Math.floor(chunk / 100);
            const tens = Math.floor((chunk % 100) / 10);
            const ones = chunk % 10;
            
            if (hundreds > 0) {
                chunkText += digits[hundreds] + ' trăm ';
            }
            
            if (tens > 1) {
                chunkText += digits[tens] + ' mười ';
            } else if (tens === 1) {
                chunkText += 'mười ';
            }
            
            if (ones > 0) {
                chunkText += digits[ones] + ' ';
            }
            
            result = chunkText + units[unitIndex] + ' ' + result;
        }
        
        num = Math.floor(num / 1000);
        unitIndex++;
    }
    
    return result.trim() + ' đồng';
}

// Calculate salary
function calculateSalary() {
    console.log('🧮 Calculating salary...');
    try {
        const data = getEmployeeData();
        
        // Update display
        document.getElementById('actualSalary').textContent = formatNumber(data.actualSalary) + ' VNĐ';
        document.getElementById('totalIncome').textContent = formatNumber(data.totalIncome) + ' VNĐ';
        document.getElementById('totalDeduction').textContent = formatNumber(data.totalDeduction) + ' VNĐ';
        document.getElementById('netSalary').textContent = formatNumber(data.netSalary) + ' VNĐ';
        
        document.getElementById('calculationResults').style.display = 'block';
        
        showSuccess('Tính toán hoàn thành!');
        console.log('✅ Salary calculated successfully');
        
        return data;
    } catch (error) {
        console.error('❌ Calculation error:', error);
        showError('Lỗi tính toán: ' + error.message);
        return null;
    }
}

// Generate payroll HTML
function generatePayrollHTML(data) {
    console.log('📄 Generating payroll HTML for:', data.fullName);
    
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    
    return `
        <div class="payroll-preview">
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                    <img src="https://btbinh2710.github.io/vtpa-payroll/logo.jpg" crossOrigin="anonymous" 
                         style="height: 40px; margin-right: 15px;" 
                         onerror="this.style.display='none'">
                    <div>
                        <div style="font-size: 16px; font-weight: bold; margin-bottom: 3px;">CÔNG TY CỔ PHẦN 27-7 HỒNG QUANG</div>
                        <div style="font-size: 11px; margin-bottom: 2px;">Km2+500, đường Phan Trọng Tuệ, Thanh Liệt, Thanh Trì, Hà Nội</div>
                        <div style="font-size: 11px;">MST: 0102147234 - Hotline: 0902279898</div>
                    </div>
                </div>
            </div>
            
            <h2 style="text-align: center; font-size: 14px; font-weight: bold; margin: 15px 0;">
                BẢNG THÔNG BÁO LƯƠNG THÁNG ${month}/${year}
            </h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; font-size: 11px;">
                <div>
                    <div style="margin-bottom: 3px;"><strong>Họ và tên:</strong> ${data.fullName}</div>
                    <div style="margin-bottom: 3px;"><strong>Bộ phận/Chi nhánh:</strong> ${data.department}</div>
                    <div style="margin-bottom: 3px;"><strong>Ngày công thực tế:</strong> ${data.workDays}</div>
                    <div style="margin-bottom: 3px;"><strong>Số xe ký trong tháng:</strong> ${data.carsigned}</div>
                </div>
                <div>
                    <div style="margin-bottom: 3px;"><strong>Mã nhân viên:</strong> ${data.employeeId}</div>
                    <div style="margin-bottom: 3px;"><strong>Chức vụ:</strong> ${data.position}</div>
                    <div style="margin-bottom: 3px;"><strong>Mức lương:</strong> ${formatNumber(data.baseSalary)}</div>
                    <div style="margin-bottom: 3px;"><strong>Tỷ lệ hưởng:</strong> ${data.salaryPercentage}%</div>
                </div>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 15px;">
                <thead>
                    <tr style="background-color: #f5f5f5;">
                        <th style="border: 1px solid #ddd; padding: 4px; width: 8%; text-align: center;">STT</th>
                        <th style="border: 1px solid #ddd; padding: 4px; width: 60%; text-align: left;">Khoản mục</th>
                        <th style="border: 1px solid #ddd; padding: 4px; width: 20%; text-align: right;">Số tiền (VNĐ)</th>
                        <th style="border: 1px solid #ddd; padding: 4px; width: 12%; text-align: left;">Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: center; font-weight: bold;">I</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-weight: bold;">THU NHẬP</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">1</td>
                        <td style="border: 1px solid #ddd; padding: 4px;">Lương</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px; padding-left: 15px;">Lương thực tế (${data.workDays} công)</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.actualSalary)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px; padding-left: 15px;">Lương tăng ca</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.overtime)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px; padding-left: 15px;">Thưởng</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.bonus)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">2</td>
                        <td style="border: 1px solid #ddd; padding: 4px;">Phụ cấp</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px; padding-left: 15px;">Phụ cấp tiền ăn</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.mealAllowance)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px; padding-left: 15px;">Phụ cấp trách nhiệm</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.responsibilityAllowance)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr style="background-color: #f9f9f9; font-weight: bold;">
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px;">TỔNG THU NHẬP (I)</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.totalIncome)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: center; font-weight: bold;">II</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-weight: bold;">KHẤU TRỪ</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">1</td>
                        <td style="border: 1px solid #ddd; padding: 4px;">BHXH</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.socialInsurance)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">2</td>
                        <td style="border: 1px solid #ddd; padding: 4px;">Khấu trừ tiền ăn</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.mealDeduction)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">3</td>
                        <td style="border: 1px solid #ddd; padding: 4px;">Khấu trừ qui chế</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.regulationDeduction)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">4</td>
                        <td style="border: 1px solid #ddd; padding: 4px;">Thuế TNCN</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.incomeTax)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">5</td>
                        <td style="border: 1px solid #ddd; padding: 4px;">Khấu trừ khác</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.otherDeduction)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr style="background-color: #f9f9f9; font-weight: bold;">
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                        <td style="border: 1px solid #ddd; padding: 4px;">TỔNG KHẤU TRỪ (II)</td>
                        <td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${formatNumber(data.totalDeduction)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px;"></td>
                    </tr>
                    <tr style="background-color: #e6f3ff; font-weight: bold; font-size: 11px;">
                        <td style="border: 1px solid #ddd; padding: 6px;"></td>
                        <td style="border: 1px solid #ddd; padding: 6px;">THỰC LĨNH (I - II)</td>
                        <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${formatNumber(data.netSalary)}</td>
                        <td style="border: 1px solid #ddd; padding: 6px;"></td>
                    </tr>
                </tbody>
            </table>
            
            <div style="margin-bottom: 15px; font-size: 11px;">
                <strong>Bằng chữ:</strong> ${numberToWords(data.netSalary).charAt(0).toUpperCase() + numberToWords(data.netSalary).slice(1)}
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 15px; font-size: 11px;">
                <div style="text-align: center;">
                    <div style="font-weight: bold; margin-bottom: 40px;">NGƯỜI LẬP BẢNG</div>
                    <div>(Ký, ghi rõ họ tên)</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-weight: bold; margin-bottom: 40px;">NGƯỜI NHẬN</div>
                    <div>(Ký, ghi rõ họ tên)</div>
                </div>
            </div>
            
            <div style="font-size: 9px; line-height: 1.3;">
                <strong>Ghi chú:</strong>
                <div style="margin-top: 5px;">
                    - Bảng lương này có giá trị thay thế cho phiếu lương và chỉ được phát hành một lần.<br>
                    - Nếu có thắc mắc, vui lòng liên hệ phòng Nhân sự trong vòng 3 ngày làm việc kể từ ngày nhận bảng lương.<br>
                    - Bảng lương này được lập thành 02 bản, 01 bản Công ty lưu và 01 bản người lao động giữ.
                </div>
            </div>
        </div>
    `;
}

// Debug Preview Function
function debugPreview(employeeData = null) {
    console.log('🔍 Preview clicked for:', employeeData?.fullName || 'manual input');
    try {
        const data = employeeData || getEmployeeData();
        if (!data) throw new Error('Không có dữ liệu nhân viên');
        
        currentEmployeeData = data;
        const html = generatePayrollHTML(data);
        document.getElementById('previewContent').innerHTML = html;
        document.getElementById('previewModal').style.display = 'block';
        
        console.log('✅ Preview modal opened');
        showSuccess('Xem trước bảng lương thành công!');
    } catch (error) {
        console.error('❌ Preview error:', error);
        showError('Lỗi xem trước: ' + error.message);
    }
}

// Font DejaVu Sans base64 (placeholder, replace with actual base64)
const dejavuSans = 'data:application/x-font-ttf;base64,...'; // Thay bằng base64 của DejaVuSans.ttf

// Debug Export Function
function debugExport(employeeData = null) {
    console.log('📄 Export clicked for:', employeeData?.fullName || 'manual input');
    try {
        const data = employeeData || getEmployeeData();
        if (!data) throw new Error('Không có dữ liệu nhân viên');
        
        const fileName = `BangLuong_${data.fullName.replace(/\s+/g, '')}_${new Date().getMonth() + 1}-${new Date().getFullYear()}.pdf`;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = generatePayrollHTML(data);
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        document.body.appendChild(tempDiv);
        
        html2canvas(tempDiv, {
            scale: 2,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Add DejaVu Sans font
            pdf.addFileToVFS('DejaVuSans.ttf', dejavuSans);
            pdf.addFont('DejaVuSans.ttf', 'DejaVuSans', 'normal');
            pdf.setFont('DejaVuSans');
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));
            pdf.save(fileName);
            
            document.body.removeChild(tempDiv);
            console.log('✅ PDF exported successfully');
            showSuccess('Xuất PDF thành công!');
        }).catch(error => {
            document.body.removeChild(tempDiv);
            throw error;
        });
        
    } catch (error) {
        console.error('❌ Export error:', error);
        showError('Lỗi xuất PDF: ' + error.message);
    }
}

// Debug Email Function
function debugEmail(employeeData) {
    console.log('📧 Email clicked for:', employeeData.fullName);
    try {
        if (!employeeData.email) {
            throw new Error('Nhân viên chưa có email');
        }

        // Gửi request tới backend
        fetch(`${BACKEND_URL}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: employeeData.email,
                subject: `Bảng lương tháng ${new Date().getMonth() + 1}/${new Date().getFullYear()} - ${employeeData.fullName}`,
                html: generatePayrollHTML(employeeData)
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showSuccess(`Đã gửi email cho ${employeeData.fullName}`);
            } else {
                showError('Lỗi gửi email: ' + data.message);
            }
        })
        .catch(err => {
            showError('Lỗi gửi email: ' + err.message);
        });
        
    } catch (error) {
        console.error('❌ Email error:', error);
        showError('Lỗi gửi email: ' + error.message);
    }
}

// Debug Upload Function
function debugUpload(file) {
    console.log('📊 Upload clicked:', file.name);
    try {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                
                // Process and display employee data
                employeesData = jsonData.map(row => ({
                    fullName: row['Họ và tên'] || '',
                    employeeId: row['Mã nhân viên'] || '',
                    department: row['Bộ phận'] || 'VF PTT HÀ NỘI',
                    position: row['Chức vụ'] || 'TVBH',
                    email: row['Email'] || '',
                    workDays: parseInt(row['Ngày công thực tế']) || 25,
                    baseSalary: parseInt(row['Mức lương']) || 0,
                    salaryPercentage: parseInt(row['Tỷ lệ hưởng']) || 100,
                    carsigned: parseInt(row['Số xe ký']) || 0,
                    overtime: parseInt(row['Lương tăng ca']) || 0,
                    bonus: parseInt(row['Thưởng']) || 0,
                    mealAllowance: parseInt(row['Phụ cấp ăn']) || 0,
                    responsibilityAllowance: parseInt(row['Phụ cấp trách nhiệm']) || 0,
                    socialInsurance: parseInt(row['BHXH']) || 0,
                    mealDeduction: parseInt(row['Khấu trừ ăn']) || 0,
                    regulationDeduction: parseInt(row['Khấu trừ qui chế']) || 0,
                    incomeTax: parseInt(row['Thuế TNCN']) || 0,
                    otherDeduction: parseInt(row['Khấu trừ khác']) || 0
                }));
                
                // Calculate for each employee
                employeesData.forEach(emp => {
                    const effectiveSalary = emp.baseSalary * (emp.salaryPercentage / 100);
                    emp.actualSalary = Math.min(effectiveSalary * (emp.workDays / 24), effectiveSalary);
                    emp.totalIncome = emp.actualSalary + emp.overtime + emp.bonus + emp.mealAllowance + emp.responsibilityAllowance;
                    emp.totalDeduction = emp.socialInsurance + emp.mealDeduction + emp.regulationDeduction + emp.incomeTax + emp.otherDeduction;
                    emp.netSalary = emp.totalIncome - emp.totalDeduction;
                });
                
                displayEmployeeTable(employeesData);
                console.log('✅ Excel processed:', employeesData.length, 'employees');
                showSuccess(`Đã xử lý ${employeesData.length} nhân viên từ Excel`);
                
            } catch (error) {
                throw new Error('Lỗi đọc file Excel: ' + error.message);
            }
        };
        reader.readAsArrayBuffer(file);
        
    } catch (error) {
        console.error('❌ Upload error:', error);
        showError('Lỗi upload Excel: ' + error.message);
    }
}

// Debug Connection Function
function debugConnection() {
    console.log('⚙️ Test connection clicked');
    const button = document.getElementById('testConnectionBtn');
    setButtonLoading(button, true);
    
    try {
        // Test kết nối SMTP với backend
        fetch(`${BACKEND_URL}/api/test-connection`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
            setButtonLoading(button, false);
            if (data.success) {
                console.log('✅ SMTP connection successful');
                showSuccess('Kết nối email thành công!');
            } else {
                console.error('❌ SMTP connection failed');
                showError('Lỗi kết nối: ' + data.message);
            }
        })
        .catch(err => {
            setButtonLoading(button, false);
            console.error('❌ Connection error:', err);
            showError('Lỗi kết nối: ' + err.message);
        });
        
    } catch (error) {
        setButtonLoading(button, false);
        console.error('❌ Connection error:', error);
        showError('Lỗi kết nối: ' + error.message);
    }
}

// Display employee table
function displayEmployeeTable(employees) {
    const tbody = document.getElementById('employeeTableBody');
    tbody.innerHTML = '';
    
    employees.forEach((emp, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2 border-b">${emp.fullName}</td>
            <td class="px-4 py-2 border-b">${emp.employeeId}</td>
            <td class="px-4 py-2 border-b">${formatNumber(emp.baseSalary)}</td>
            <td class="px-4 py-2 border-b">${emp.salaryPercentage}%</td>
            <td class="px-4 py-2 border-b">${emp.workDays}</td>
            <td class="px-4 py-2 border-b">${emp.email}</td>
            <td class="px-4 py-2 border-b text-center">
                <button class="btn-debug bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-1 text-sm" onclick="debugPreview(employeesData[${index}])">
                    👁️
                </button>
                <button class="btn-debug bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-1 text-sm" onclick="debugExport(employeesData[${index}])">
                    📄
                </button>
                <button class="btn-debug bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-sm" onclick="debugEmail(employeesData[${index}])">
                    📧
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    document.getElementById('employeeTable').style.display = 'block';
}

// Download Excel template
function downloadTemplate() {
    console.log('📋 Downloading Excel template...');
    try {
        const templateData = [
            {
                'Họ và tên': 'Nguyễn Văn A',
                'Mã nhân viên': '1001',
                'Bộ phận': 'VF PTT HÀ NỘI',
                'Chức vụ': 'TVBH',
                'Email': 'nguyenvana@example.com',
                'Ngày công thực tế': 25,
                'Mức lương': 8500000,
                'Tỷ lệ hưởng': 100,
                'Số xe ký': 5,
                'Lương tăng ca': 500000,
                'Thưởng': 2000000,
                'Phụ cấp ăn': 500000,
                'Phụ cấp trách nhiệm': 0,
                'BHXH': 0,
                'Khấu trừ ăn': 0,
                'Khấu trừ qui chế': 0,
                'Thuế TNCN': 0,
                'Khấu trừ khác': 150000
            }
        ];
        
        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Template');
        XLSX.writeFile(wb, 'Template_BangLuong_VTPA.xlsx');
        
        console.log('✅ Template downloaded successfully');
        showSuccess('Đã tải template Excel thành công!');
    } catch (error) {
        console.error('❌ Template download error:', error);
        showError('Lỗi tải template: ' + error.message);
    }
}

// Bind all events
function bindButtonEvents() {
    console.log('🔗 Binding button events...');
    
    // Manual form buttons
    const previewBtn = document.getElementById('previewBtn');
    const exportBtn = document.getElementById('exportBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (previewBtn) {
        previewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔍 Manual preview clicked');
            const button = this;
            setButtonLoading(button, true);
            setTimeout(() => {
                debugPreview();
                setButtonLoading(button, false);
            }, 500);
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📄 Manual export clicked');
            const button = this;
            setButtonLoading(button, true);
            setTimeout(() => {
                debugExport();
                setButtonLoading(button, false);
            }, 500);
        });
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🧮 Calculate clicked');
            calculateSalary();
        });
    }
    
    // Excel upload
    const excelFile = document.getElementById('excelFile');
    if (excelFile) {
        excelFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                debugUpload(file);
            }
        });
    }
    
    // Download template
    const downloadTemplateBtn = document.getElementById('downloadTemplateBtn');
    if (downloadTemplateBtn) {
        downloadTemplateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadTemplate();
        });
    }
    
    // Test connection
    const testConnectionBtn = document.getElementById('testConnectionBtn');
    if (testConnectionBtn) {
        testConnectionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            debugConnection();
        });
    }
    
    // Modal controls
    const closeModal = document.getElementById('closeModal');
    const previewModal = document.getElementById('previewModal');
    const modalExportBtn = document.getElementById('modalExportBtn');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            console.log('❌ Modal closed');
            previewModal.style.display = 'none';
        });
    }
    
    if (modalExportBtn) {
        modalExportBtn.addEventListener('click', function() {
            console.log('📄 Modal export clicked');
            if (currentEmployeeData) {
                debugExport(currentEmployeeData);
            }
        });
    }
    
    // Close modal on backdrop click
    if (previewModal) {
        previewModal.addEventListener('click', function(e) {
            if (e.target === this) {
                console.log('❌ Modal closed via backdrop');
                this.style.display = 'none';
            }
        });
    }
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && previewModal.style.display === 'block') {
            console.log('❌ Modal closed via ESC');
            previewModal.style.display = 'none';
        }
    });
    
    console.log('✅ All button events bound successfully');
}

// Check logo load
function checkLogoLoad() {
    console.log('🖼️ Checking logo load...');
    const logo = document.getElementById('logo');
    if (logo.complete) {
        if (logo.naturalWidth === 0) {
            console.warn('⚠️ Logo failed to load, showing fallback');
            document.getElementById('logo-fallback').style.display = 'block';
            logo.style.display = 'none';
        } else {
            console.log('✅ Logo loaded successfully');
        }
    }
}

// Initialize modals
function initializeModals() {
    console.log('🗂️ Initializing modals...');
    // Modal initialization code here
}

// Setup form validation
function setupFormValidation() {
    console.log('📝 Setting up form validation...');
    
    // Add real-time validation
    const requiredFields = ['fullName', 'employeeId', 'email', 'baseSalary'];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                if (this.value.trim() === '') {
                    this.classList.add('border-red-500');
                } else {
                    this.classList.remove('border-red-500');
                }
            });
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, binding events...');
    
    try {
        initializeTabs();
        bindButtonEvents();
        checkLogoLoad();
        initializeModals();
        setupFormValidation();
        
        console.log('✅ All events bound successfully');
        showSuccess('Hệ thống đã sẵn sàng!');
        
        // Auto-calculate when form changes
        const formFields = document.querySelectorAll('#manualForm input, #manualForm select');
        formFields.forEach(field => {
            field.addEventListener('change', function() {
                if (document.getElementById('calculationResults').style.display !== 'none') {
                    calculateSalary();
                }
            });
        });
        
    } catch (error) {
        console.error('❌ Initialization error:', error);
        showError('Lỗi khởi tạo hệ thống: ' + error.message);
    }
});

console.log('📚 VTPA Payroll System initialized - All debug functions ready'); 