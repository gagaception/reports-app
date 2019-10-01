if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store, key: '_auth_key',
                                                        domain: 'some-domain'
else
  Rails.application.config.session_store :cookie_store, key: '_auth_key'
end