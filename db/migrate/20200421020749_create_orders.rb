class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|      
      t.string :first_name
      t.string :last_name
      t.string :email
      t.integer :sub_total
      t.integer :shipping_total

      t.timestamps
    end
  end
end
