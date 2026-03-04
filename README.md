# Dự Án Cây Xanh Văn Toán

## 1. Tự Động Hóa Docker Image (GitHub Actions)
Docker image của dự án sẽ được hệ thống GitHub Actions tự động build và push lên GitHub Container Registry (`ghcr.io/thu-nguyen3136/cay-xanh-van-toan:latest`) khi có các sự kiện sau:
- Mở và Merge **Pull Request** vào nhánh `main`
- **Commit push trực tiếp** lên nhánh `main`
- **Commit push trực tiếp** lên nhánh `github-action-creation`

## 2. Hướng Dẫn Deploy Trên Production
Để khởi chạy hoặc cập nhật phiên bản mới nhất của website trên máy chủ production, hãy làm theo các bước dưới đây:

**Bước 1:** Copy nội dung từ file `docker-compose.prod.yml` trong mã nguồn và tạo ra một file tên là `docker-compose.yml` trên máy chủ production.

**Bước 2:** Đặt file `deploy.sh` (chứa các lệnh tự động pull docker image mới nhất và chạy trên port 80) vào cùng thư mục với file `docker-compose.yml` vừa tạo trên production.

**Bước 3:** Cấp quyền thực thi cho file script deploy bằng lệnh:
```bash
chmod +x deploy.sh
```

**Bước 4:** Chạy file deploy để bắt đầu cập nhật và chạy website:
```bash
./deploy.sh
```
*(Lưu ý: Bạn có thể sử dụng `./deploy.sh` hoặc `bash deploy.sh`)*
