require "test_helper"

class VideosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @video = videos(:one)
    # Tạo JWT Token giả lập để test các API Private
    @token = JWT.encode({ user_id: @user.id }, Rails.application.secret_key_base)
    @headers = { "Authorization" => "Bearer #{@token}" }
  end

  test "should get index without authentication" do
    # Test API lấy danh sách video (Public)
    get '/api/videos'
    assert_response :success

    # Kiểm tra xem dữ liệu trả về có chứa email người share không
    json_response = JSON.parse(response.body)
    assert_not_nil json_response.first['user']['email']
  end

  test "should not create video without token" do
    # Test chặn người dùng chưa đăng nhập
    assert_no_difference("Video.count") do
      post '/api/videos', params: { youtube_url: "https://youtube.com/watch?v=xyz", title: "New Video" }
    end
    assert_response :unauthorized
  end

  test "should create video with valid token" do
    # Test tạo video thành công khi có Token hợp lệ
    assert_difference("Video.count", 1) do
      post '/api/videos',
           params: { youtube_url: "https://youtube.com/watch?v=xyz", title: "New Video", description: "Desc" },
           headers: @headers
    end
    assert_response :created
  end
end
