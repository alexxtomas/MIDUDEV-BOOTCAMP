import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import sortReducer from './reducers/sortReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore(
  {
    reducer: {
      anecdotes: anecdoteReducer,
      sort: sortReducer,
      notification: notificationReducer,
      filter: filterReducer
    }
  },
  composeWithDevTools(applyMiddleware())
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
