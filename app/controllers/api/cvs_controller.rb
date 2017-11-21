class Api::CvsController < ApplicationController

  def fetch_cvs
    render json: Cv.order('cv_date DESC')
  end
end
