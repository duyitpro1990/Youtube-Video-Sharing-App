require "test_helper"

class VideoTest < ActiveSupport::TestCase
  test "should be valid with valid attributes" do
    video = Video.new(
      title: "Test Video",
      youtube_url: "https://youtube.com/watch?v=abc",
      user: users(:one)
    )
    assert video.valid?
  end

  test "should not save video without youtube_url" do
    video = Video.new(title: "Test Video", user: users(:one))
    assert_not video.save, "Saved the video without a youtube_url"
  end

  test "should belong to a user" do
    video = Video.new(title: "Test Video", youtube_url: "https://youtube.com/watch?v=abc")
    assert_not video.save, "Saved the video without assigning a user"
  end
end
