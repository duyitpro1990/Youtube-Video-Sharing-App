class VideoNotificationJob < ApplicationJob
  queue_as :default

  def perform(video_id, user_email)
    video = Video.find_by(id: video_id)
    return unless video

    # Phát dữ liệu dạng JSON qua WebSockets
    ActionCable.server.broadcast("notifications_channel", {
        type: 'NEW_VIDEO',
        video: {
          id: video.id,
          title: video.title,
          youtube_url: video.youtube_url,
          description: video.description,
          user: {
               email: user_email
          }
        }
    })
  end
end
