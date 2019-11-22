class AddShippingCostToArtworks < ActiveRecord::Migration[5.1]
  def change
    add_column :artworks, :shipping_cost, :integer, default: 0
  end
end
