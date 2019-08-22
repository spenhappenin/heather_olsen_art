class Api::UsersController < ApplicationController

  def show
    render json: User.find(1)
  end

  def update
    user = User.find(1)
    if params.keys.first === "undefined" 
      user.update(artist_statement: params[:artist_statement], bio: params[:bio])
      render json: user
    else
      render json: User.upload_image(params, user)     
    end
  end

end
