class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    # Bất kỳ user nào kết nối sẽ lắng nghe kênh này
    stream_from "notifications_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
