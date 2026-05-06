class AuthController < ApplicationController
  # POST /api/auth/register
  def register
    user = User.new(auth_params)
    if user.save
      token = encode_token({ user_id: user.id })
      render json: { user: { email: user.email }, token: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/auth/login
  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = encode_token({ user_id: user.id })
      render json: { user: { email: user.email }, token: token }, status: :ok
    else
      render json: { error: 'Email hoặc mật khẩu không đúng' }, status: :unauthorized
    end
  end

  private

  def auth_params
    params.permit(:email, :password)
  end

  def encode_token(payload)
    # Sử dụng secret_key_base mà chúng ta đã cấu hình trong Docker
    JWT.encode(payload, Rails.application.secret_key_base)
  end
end
