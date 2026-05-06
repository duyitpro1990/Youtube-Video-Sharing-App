Rails.application.routes.draw do
  scope '/api' do
    # Auth
    post 'auth/register', to: 'auth#register'
    post 'auth/login', to: 'auth#login'

    # Videos
    resources :videos, only: [:index, :create]
  end

  # Cấu hình endpoint cho WebSockets (ActionCable)
  mount ActionCable.server => '/cable'
end
