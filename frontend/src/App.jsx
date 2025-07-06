import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Initiative from "./pages/Initiative"

function App() {

  return (
    <>
      <h1 className='text-red-500'>EcoSphere</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Initiative' element={<Initiative />} />
      </Routes>
    </>
  )
}

export default App
