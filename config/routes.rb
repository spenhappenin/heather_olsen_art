Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    get '/comissions', to: 'art_works#fetch_comissions'
    get '/paintings', to: 'art_works#fetch_paintings'
    get '/drawings', to: 'art_works#fetch_drawings'
    get '/works', to: 'categories#fetch_works'
    get '/all_artworks', to: 'art_works#all_artworks'
    get '/artworks', to: 'art_works#fetch_art_works'
    get '/single_artwork/:id', to: 'art_works#single_artwork'
    get '/cvs', to: 'cvs#fetch_cvs'
    put '/cv/:id', to: 'cvs#update_cv'
    resources :cvs, only: [:create, :destroy]
    resources :art_works, only: [:create, :update, :destroy]
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
