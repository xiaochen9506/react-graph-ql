import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'antd/dist/antd.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <App/>,
)
