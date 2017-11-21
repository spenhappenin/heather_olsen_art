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

  private 
  def art_work_params
    params.require(:art_works).permit(:title, :url, :type_of, :medium, :surface, :dimensions, :price, :date_complete)
  end

end