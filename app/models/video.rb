class Video < ApplicationRecord

  def self.all_videos
    Video.all.order("created_at DESC")
  end

end
