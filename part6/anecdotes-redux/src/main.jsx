import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createStore } from 'redux';
import anecdoteReducer from './reducers/anecdoteReducer.js';
import { Provider } from 'react-redux'

const store = createStore(anecdoteReducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
