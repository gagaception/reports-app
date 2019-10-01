Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: redirect('/reports')

  get '/login', to: 'static#homepage'
  get 'reports', to: 'static#homepage'
  get 'reports/new', to: 'static#homepage'
  get 'reports/:id', to: 'static#homepage'
  get 'reports/:id/edit', to: 'static#homepage'
  get '/reports/:id/download_file', to: 'static#homepage'

  resources :sessions, only: [:create]
  get :login, to: 'sessions#login'
  delete :logout, to: 'sessions#logout'
  
  namespace :api do
    resources :reports do
      get 'download_file'
    end
  end
end
