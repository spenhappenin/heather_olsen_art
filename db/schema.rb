# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180724233116) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artwork_categories", force: :cascade do |t|
    t.bigint "category_id"
    t.bigint "artwork_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artwork_id"], name: "index_artwork_categories_on_artwork_id"
    t.index ["category_id"], name: "index_artwork_categories_on_category_id"
  end

  create_table "artworks", force: :cascade do |t|
    t.string "title"
    t.text "url"
    t.string "medium"
    t.string "surface"
    t.string "dimensions"
    t.float "price"
    t.date "date_complete"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
  end

  create_table "categories", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "display_image"
    t.string "route"
  end

  create_table "cvs", force: :cascade do |t|
    t.string "title"
    t.string "cv_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "cv_date"
    t.string "location"
  end

  create_table "series", force: :cascade do |t|
    t.string "title"
    t.date "release_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "series_art_works", force: :cascade do |t|
    t.bigint "art_work_id"
    t.bigint "series_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["art_work_id"], name: "index_series_art_works_on_art_work_id"
    t.index ["series_id"], name: "index_series_art_works_on_series_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "bio"
    t.text "artist_statement"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "artwork_categories", "artworks"
  add_foreign_key "artwork_categories", "categories"
  add_foreign_key "series_art_works", "artworks", column: "art_work_id"
  add_foreign_key "series_art_works", "series"
end
