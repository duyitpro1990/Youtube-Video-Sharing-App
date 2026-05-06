class VideosController < ApplicationController
  before_action :authorize_user, only: [:create]

  # GET /api/videos (Public)
  def index
    videos = Video.includes(:user).order(created_at: :desc)
    render json: videos.as_json(include: { user: { only: [:email] } })
  end

  # POST /api/videos (Private)
  def create
    video = @current_user.videos.build(video_params)
    if video.save
      # Gọi Background Job để gửi thông báo Real-time
      VideoNotificationJob.perform_later(video.id, @current_user.email)
      render json: video, status: :created
    else
      render json: { errors: video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def video_params
    params.permit(:youtube_url, :title, :description)
  end

  def authorize_user
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    begin
      decoded = JWT.decode(token, Rails.application.secret_key_base)[0]
      @current_user = User.find(decoded['user_id'])
    rescue
      render json: { error: 'Bạn cần đăng nhập để thực hiện hành động này' }, status: :unauthorized
    end
  end
end
