class Api::CvsController < ApplicationController
  def index
    render json: Cv.all_cvs
  end
end
