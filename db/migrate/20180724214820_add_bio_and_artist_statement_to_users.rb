class AddBioAndArtistStatementToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :bio, :text
    add_column :users, :artist_statement, :text
  end
end
