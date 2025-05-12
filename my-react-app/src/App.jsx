import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { store } from './store/store'
import { Provider} from 'react-redux'
import { Routes } from 'react-router-dom'


function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
