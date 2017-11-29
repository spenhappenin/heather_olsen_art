class Api::ArtWorksController < ApplicationController

  def fetch_comissions    
    render json: ArtWork.where(type_of: 'comission')
  end

  def fetch_paintings
    render json: ArtWork.where(type_of: 'painting')
  end

  def fetch_drawings
    render json: ArtWork.where(type_of: 'drawing')
  end

  def create
    auth = {
      cloud_name: ENV['CLOUD_NAME'],
      api_key: ENV['API_KEY'],
      api_secret: ENV['API_SECRET']
    }
    
    binding.pry
  end

  private 
  def art_work_params
    params.require(:art_works).permit(:title, :url, :type_of, :medium, :surface, :dimensions, :price, :date_complete)
  end

end