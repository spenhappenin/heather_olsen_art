class AddRouteToCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :route, :string
  end
end
