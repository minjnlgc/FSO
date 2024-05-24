import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createStore, combineReducers } from 'redux';
import anecdoteReducer from './reducers/anecdoteReducer.js';
import filterReducer from './reducers/filterReducer.js';
import { Provider } from 'react-redux'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
