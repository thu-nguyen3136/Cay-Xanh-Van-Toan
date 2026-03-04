# Dự Án Cây Xanh Văn Toán

## 1. Tự Động Hóa Docker Image (GitHub Actions)
Docker image của dự án sẽ được hệ thống GitHub Actions tự động build và push lên GitHub Container Registry khi có các sự kiện sau:
- Merge **Pull Request** vào nhánh `main`

## 2. Hướng Dẫn Deploy Trên Production
Để khởi chạy hoặc cập nhật phiên bản mới nhất của website trên máy chủ production, hãy làm theo các bước dưới đây:

**Bước 1: Cài đặt Cloudflared**
Mở PowerShell trên máy cá nhân của bạn và chạy lệnh sau:
```powershell
winget install --id Cloudflare.cloudflared
```

**Bước 2: Kết nối SSH vào máy chủ**
Sử dụng ssh thông qua Cloudflare Tunnel để truy cập vào máy chủ.
```powershell
ssh ...chuỗi lệnh được gửi qua email...
```

**Bước 3: Di chuyển đến thư mục làm việc**
Sau khi đăng nhập thành công, hãy di chuyển vào đúng thư mục chứa các file cấu hình và chạy Docker:
```bash
cd /home/tgh2171/www/html
```

**Bước 4: Chuẩn bị file Docker Compose**
Đảm bảo bạn đã có file `docker-compose.yml` tại thư mục này. Nội dung của nó phải giống hệt với nội dung từ file `docker-compose.prod.yml` trong mã nguồn.

**Bước 5: Chuẩn bị script Deploy**
Đặt file `deploy.sh` (chứa các lệnh tự động pull image mới nhất và chạy container) vào cùng thư mục `/home/tgh2171/www/html`. 

**Bước 6: Khởi chạy và cập nhật Website**
Cấp quyền thực thi và chạy file script:
```bash
sudo chmod +x deploy.sh
./deploy.sh
```
