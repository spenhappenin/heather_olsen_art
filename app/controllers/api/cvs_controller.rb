class Api::CvsController < ApplicationController

  def fetch_cvs
    render json: Cv.all
  end
end
