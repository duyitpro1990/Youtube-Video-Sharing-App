FROM ruby:3.3.0-slim

# Cài đặt các package cần thiết cho hệ thống và MySQL
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    default-mysql-client \
    default-libmysqlclient-dev \
    pkg-config \
    git

# Đồng bộ với đường dẫn /app trong docker-compose.yml
WORKDIR /app

# Copy file lock và cài đặt toàn bộ gem (bao gồm cả dev)
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy toàn bộ code vào container
COPY . .

# Khai báo port và lệnh khởi động
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
