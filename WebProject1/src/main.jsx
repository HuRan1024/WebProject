import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-dom'
import './Login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter> */}
    <App />
  </React.StrictMode>,
)