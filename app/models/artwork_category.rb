class ArtworkCategory < ApplicationRecord
  belongs_to :category
  belongs_to :artwork
end
