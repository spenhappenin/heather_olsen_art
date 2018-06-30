class ArtworkCategory < ApplicationRecord
  belongs_to :category
  belongs_to :art_work
end
