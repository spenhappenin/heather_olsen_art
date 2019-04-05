Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    get '/works', to: 'categories#fetch_works'
    get '/all_artworks', to: 'artworks#all_artworks'
    get '/artworks', to: 'artworks#fetch_artworks'
    get '/single_artwork/:id', to: 'artworks#single_artwork'
    get 'single_category/:id', to: 'categories#single_category'
    get '/cvs', to: 'cvs#fetch_cvs'
    put '/cv/:id', to: 'cvs#update_cv'
    get '/fetch_about', to: 'artworks#fetch_user'
    put '/user_bio_statement', to: 'artworks#user_bio_statement'
    resources :cvs, only: [:create, :destroy]
    resources :artworks, only: [:create, :update, :destroy]
    resources :categories, only: [:create, :update, :destroy]
    resources :videos, only: [:index, :show, :create, :update, :destroy]
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
