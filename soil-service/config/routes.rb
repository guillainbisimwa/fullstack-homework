Rails.application.routes.draw do
  resources :fields, only: [:index]
  resources :crops, only: [:index]
  resources :humus_balance, only: [:create]
end
