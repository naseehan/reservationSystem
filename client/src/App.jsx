import { useState } from 'react'
import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import ReactNavbar from './components/ReactNavbar'
import { ChakraProvider } from '@chakra-ui/react'
// mdb

import RoomBooking from './pages/RoomBooking'
import Navbar from './components/Navbar'
import AdminDashboard from './pages/AdminDashboard'
import Cart from './pages/Cart'

function App() {

  return (
    <>
 <ChakraProvider>
      <div className='app-container'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/rooms' element={<RoomBooking />} />
        <Route path='/dashboard' element={<AdminDashboard />} /> 
        <Route path='/cart' element={<Cart />} />
      </Routes>
      </div>
      </ChakraProvider>
    </>
  )
}

export default App
