import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import { Home,Login,Signup } from './pages'

function App() {

  return (
    <>
   <Nav/>         
    <h1 className='text-red-500'>EcoSphere</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App


