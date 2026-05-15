import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EryndorActiveConditionGenerator from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EryndorActiveConditionGenerator />
  </React.StrictMode>,
)
