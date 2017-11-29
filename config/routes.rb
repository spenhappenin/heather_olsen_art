Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    get '/comissions', to: 'art_works#fetch_comissions'
    get '/paintings', to: 'art_works#fetch_paintings'
    get '/drawings', to: 'art_works#fetch_drawings'
    get '/cvs', to: 'cvs#fetch_cvs'
    put '/cv/:id', to: 'cvs#update_cv'
    resources :cvs, only: [:create, :destroy]
    resources :art_works, only: [:create]
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
