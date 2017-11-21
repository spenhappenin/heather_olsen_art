class CreateCvs < ActiveRecord::Migration[5.1]
  def change
    create_table :cvs do |t|
      t.integer :cv_year
      t.string :title
      t.string :cv_type

      t.timestamps
    end
  end
end
