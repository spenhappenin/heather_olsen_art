class Category < ApplicationRecord
  has_many :artwork_categories
  has_many :art_works, :through => :artwork_categories
end
