class CreateArtWorks < ActiveRecord::Migration[5.1]
  def change
    create_table :art_works do |t|
      t.string :title
      t.text :url
      t.string :type_of
      t.string :medium
      t.string :surface
      t.string :dimensions
      t.float :price
      t.date :date_complete

      t.timestamps
    end
  end
end
