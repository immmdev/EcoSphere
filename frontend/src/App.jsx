import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Signup } from './pages'
import Profile from './pages/Profile'

function App() {

  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
