class Api::ArtWorksController < ApplicationController

  def display_comissions    
    render json: ArtWork.where(type_of: 'comission')
  end

  private 
  def art_work_params
    params.require(:art_works).permit(:title, :url, :type_of, :medium, :surface, :dimensions, :price, :date_complete)
  end

end