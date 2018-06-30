class CreateArtworkCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :artwork_categories do |t|
      t.belongs_to :category, foreign_key: true
      t.belongs_to :art_work, foreign_key: true

      t.timestamps
    end
  end
end
