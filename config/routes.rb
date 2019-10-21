Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"
  namespace :api do
    resources :artworks
    get "/available_artwork", to: "artworks#available_artwork"
    get "/all_artworks", to: "artworks#all_artworks"
    resources :blogs
    get "/category_order_change", to: "categories#order_change"
    resources :categories
    resources :cvs, except: :show
    resources :videos
    resources :users, only: [:show, :update]
  end

  #Do not place any routes below this one
  get "*other", to: "static#index"
end
