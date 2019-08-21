Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"
  namespace :api do
    resources :artworks
    get "/available_artwork", to: "artworks#available_artwork"
    get "/all_artworks", to: "artworks#all_artworks"

    resources :blogs

    resources :categories
    put "categories/change_order", to: "categories#change_order"

    resources :cvs, except: :show

    resources :videos
    
    get "/fetch_about", to: "users#fetch_user"
    put "/user_bio_statement", to: "users#user_bio_statement"
  end

  #Do not place any routes below this one
  get "*other", to: "static#index"
end
