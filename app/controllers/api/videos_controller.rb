class Api::VideosController < ApplicationController
  def index     
    render json: Video.all_videos
  end

  def show
    render json: Video.find(params[:id])
  end
end
