class AddPositionToCategory < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :position, :integer
  end
end
