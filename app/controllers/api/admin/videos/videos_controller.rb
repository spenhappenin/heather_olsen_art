class Api::Admin::Videos::VideosController < ApplicationController
  include AdminCheck
  before_action :set_video, except: :create

  def create 
    video = Video.new(video_params)
    if video.save
      render json: video
    else
      render_error(video)
    end
  end

  def update
    if @video.update(video_params)
      render json: @video
    else
      render_error(@video)
    end
  end

  def destroy
    @video.destroy
    render json: @video
  end

  private
    def video_params
      params.require(:video).permit(:title, :body, :url)
    end

    def set_video
      @video = Video.find(params[:id])
    end
end
