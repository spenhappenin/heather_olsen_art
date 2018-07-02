Devise.setup do |config|
  config.secret_key = Rails.env.production? ? ENV['DEVISE_SECRET_KEY'] : '0277163575cf6a108063fd63a8f5a0af70a9005860bc433b80d35bf9d1c1ffacd3dc3620e1e1b2e305af829dca907bbaf9df8eaa6f6e85908e92c88b44e9a986'
end
