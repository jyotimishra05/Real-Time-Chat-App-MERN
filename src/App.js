import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Registered from './pages/Registered'
import Login from './pages/Login'
import Chat from './pages/Chat'
import "./index.css"
import SetAvatar from './pages/SetAvatar'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/register' element={<Registered/>}/>
    <Route path='/login' element ={<Login/>}/>
    <Route path='/setavatar' element={<SetAvatar/>}/>
    <Route path='/' element={<Chat/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
