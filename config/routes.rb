Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"
  namespace :api do

    namespace :admin do
      namespace :categories do
        resources :categories, only: [:index, :create, :update, :destroy]
        resources :category_order, only: :update
      end
      namespace :videos do
        resources :videos, only: [:create, :update, :destroy]
      end
    end

    resources :artworks
    get "/available_artwork", to: "artworks#available_artwork"
    get "/all_artworks", to: "artworks#all_artworks"
    resources :blogs
    resources :categories, only: [:index, :show]
    resources :cvs, except: :show
    resources :videos, only: [:index, :show]
    resources :users, only: [:show, :update]
  end

  #Do not place any routes below this one
  get "*other", to: "static#index"
end
