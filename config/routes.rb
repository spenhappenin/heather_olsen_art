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
      namespace :blogs do
        resources :blogs, only: [:create, :update, :destroy]
      end
      namespace :artworks do
        resources :artworks, only: [:create, :update, :destroy]
      end
      namespace :cvs do
        resources :cvs, only: [:create, :update, :destroy]
      end
    end

    namespace :artworks do
      resources :artworks, only: [:index, :show]
      resources :available_artworks, only: :index
      resources :all_artworks, only: :index
    end
    get "/artworks/butterflies", to: "artworks/artworks#get_butterflies"

    # TODO: Own controller
    get "/check-availability", to: "cart#check_availability"

    resources :blogs, only: [:index, :show]
    resources :categories, only: [:index, :show]
    resources :cvs, only: [:index, :show]
    resources :videos, only: [:index, :show]
    resources :users, only: [:show, :update]
    resources :cart, only: :index
    resources :charges, only: :create
  end

  #Do not place any routes below this one
  get "*other", to: "static#index"
end
