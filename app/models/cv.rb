class Cv < ApplicationRecord

  def self.all_cvs
    Cv.order('cv_date DESC')
  end

end
