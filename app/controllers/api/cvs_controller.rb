class Api::CvsController < ApplicationController
  before_action :set_cv, only: [:update, :destroy]

  def index
    render json: Cv.all_cvs
  end

  def create
    cv = Cv.new(cv_params)
    if cv.save
      render json: cv
    else
      render_error(cv)
    end
  end

  def update
    if @cv.update(cv_params)
      render json: @cv
    else
      render_error(@cv)
    end
  end

  def destroy
    if @cv.destroy
      render json: @cv
    else
      render_error(@cv)
    end
  end

  private
    def cv_params
      params.require(:cv).permit(:title, :cv_type, :cv_date, :location)
    end

    def set_cv 
      @cv = Cv.find(params[:id])
    end
end
