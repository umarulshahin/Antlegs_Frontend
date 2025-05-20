import React from 'react'
import {BrowserRouter, Routes,Route } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='Signup/' element={<Signup />} />

      </Routes>
    </BrowserRouter>
    )
}

export default App