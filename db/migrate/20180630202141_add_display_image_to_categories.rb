class AddDisplayImageToCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :display_image, :text
  end
end
