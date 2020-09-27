Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create,:index]
    resource :session, only: [:create,:destroy]
    resources :searches, only: [:index]
    resources :friends, only: [:index]
    resources :newsfeed, only: [:index]
    resources :posts, only: [:create,:destroy,:update,:show]
    resources :comments, only: [:create]
  end
end