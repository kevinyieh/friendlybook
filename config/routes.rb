Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create,:index,:show]
    resource :session, only: [:create,:destroy]
    resources :searches, only: [:index]
    resources :friends, only: [:index,:destroy]
    resources :newsfeed, only: [:index]
    resources :posts, only: [:create,:destroy,:update,:show,:index]
    resources :comments, only: [:create,:update,:destroy]
    resources :friend_requests, only:[:index,:destroy,:update,:create]
    resources :likes, only:[:create,:destroy]
    resources :profile_pics, only:[:create,:destroy]
    resources :wallpapers, only:[:create,:destroy]
  end
end