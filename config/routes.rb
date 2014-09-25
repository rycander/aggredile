Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy] 
  namespace :api do
    resources :feeds, only: [:index, :show, :create]
  end
end
