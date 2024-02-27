import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from "./pages/homepage"
import Support from "./pages/support"
import Cards from "./pages/cards"
import Settings from "./pages/settings"
import Login from "./pages/login"
import Register from "./pages/register"
import Transactions from "./pages/transactions"
import BottomBar from './components/bottombar'
import Topbar from './components/topar'
import ForgottenPassword from './pages/forgottenPassword'
import { useCookies } from 'react-cookie'

function App() {

  return (
    <>    
    
    <Routes>
          <Route element={<Homepage/>} path='/'/>
          <Route element={<Support/>} path='/support'/>
          <Route element={<Cards/>} path='/cards'/>
          <Route element={<Settings/>} path='/settings'/>
          <Route element={<Transactions/>} path='/transactions'/>
          <Route element={<Login/>} path='/login'/>
          <Route element={<Register/>} path='/register'/>
          <Route element={<ForgottenPassword/>} path='/forgotten-password'/>
    </Routes>
    </>
  )
}

export default App
