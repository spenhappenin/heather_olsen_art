class CreateArtOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :art_orders do |t|
      t.belongs_to :artwork, foreign_key: true
      t.belongs_to :order, foreign_key: true

      t.timestamps
    end
  end
end
