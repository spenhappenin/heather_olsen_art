class Api::VideosController < ApplicationController
  before_action :set_video, only: [:show, :update, :destroy]

  def index     
    render json: Video.all_videos
  end

  def show
    render json: @video
  end

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
