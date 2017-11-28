class Api::CvsController < ApplicationController

  def fetch_cvs
    render json: Cv.order('cv_date DESC')
  end

  def create_cv
    cv = Cv.new(cv_params)
    if cv.save
      render json: cv
    else
      render json: error_status(cv), status: 422
    end
  end

  def update_cv
    cv = Cv.find(params[:id])
    if cv.update(cv_params)
      render json: cv
    else
      render json: error_status(cv), status: 422
    end
  end

  private
    def cv_params
      params.require(:cv).permit(:title, :cv_type, :cv_date, :location)
    end
end
