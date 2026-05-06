# Sử dụng image Node.js gọn nhẹ
FROM node:20-alpine

# Set thư mục làm việc mặc định trong container
WORKDIR /app

# Copy các file quản lý thư viện vào trước để tận dụng cache của Docker
COPY package*.json ./

# Cài đặt các gói thư viện (node_modules)
RUN npm install

# Copy toàn bộ mã nguồn Frontend vào container
COPY . .

# Mở port 5173 (Port mặc định của Vite)
EXPOSE 5173

# Lệnh khởi chạy Vite. Cần cờ --host để có thể truy cập từ bên ngoài container
CMD ["npm", "run", "dev", "--", "--host"]
