Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Trong môi trường dev, chúng ta tạm cho phép mọi địa chỉ Frontend ('*') gọi vào
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
