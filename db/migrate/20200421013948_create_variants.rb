class CreateVariants < ActiveRecord::Migration[5.1]
  def change
    create_table :variants do |t|
      t.string :title
      t.integer :price, default: 0
      t.string :surface
      t.string :dimensions
      t.integer :quantity, default: 0
      t.belongs_to :artwork, foreign_key: true

      t.timestamps
    end
  end
end
