Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy] 
  
  namespace :api, defaults: { format: :json } do
    resources :feeds, only: [:index, :show, :create] do
      resources :entries, only: [:index]
    end
    get 'entries', to: 'entries#user_entries', as: 'user_entries'
    get 'entries/:page', to: 'entries#user_entries', as: 'user_entries_at_page'
    resources :entries, only: [:show]
  end
end
