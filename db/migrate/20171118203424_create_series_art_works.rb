class CreateSeriesArtWorks < ActiveRecord::Migration[5.1]
  def change
    create_table :series_art_works do |t|
      t.belongs_to :art_work, foreign_key: true
      t.belongs_to :series, foreign_key: true

      t.timestamps
    end
  end
end
