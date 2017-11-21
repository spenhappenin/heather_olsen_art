Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    get 'comissions', to: 'art_works#fetch_comissions'
    get 'paintings', to: 'art_works#fetch_paintings'
    get 'drawings', to: 'art_works#fetch_drawings'
    get 'cvs', to: 'cvs#fetch_cvs'
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
