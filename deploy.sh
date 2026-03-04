#!/bin/bash

# 1. Kéo image mới nhất từ GitHub Container Registry
echo "🚀 Đang kéo image mới nhất từ ghcr.io..."
sudo docker compose pull web

# 2. Khởi động lại container với image vừa tải
# Lệnh 'up -d' sẽ chỉ tạo lại container nếu phát hiện image có thay đổi (latest mới)
echo "♻️ Đang cập nhật container..."
sudo docker compose up -d web

# 3. Dọn dẹp các image cũ (dangling images) để tiết kiệm dung lượng ổ cứng
echo "🧹 Đang dọn dẹp image thừa..."
sudo docker image prune -f

echo "✅ Đã deploy thành công bản mới nhất!"
