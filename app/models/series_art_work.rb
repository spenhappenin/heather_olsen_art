class SeriesArtWork < ApplicationRecord
  belongs_to :artwork, optional: true
  belongs_to :series, optional: true
end
