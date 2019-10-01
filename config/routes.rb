Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static#homepage'
  resources :sessions, only: [:create]
  get :login, to: 'sessions#login'
  delete :logout, to: 'sessions#logout'
end
