class Api::VideosController < ApplicationController
  before_action :set_video, only: [:show, :update, :destroy]

  def index 
    videos = Video.all.order("created_at DESC")
    render json: videos
  end

  def show
    render json: @video
  end

  def create 
    video = Video.create(video_params)
    render json: video
  end

  def update
    @video.update(video_params)
    render json: @video
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
