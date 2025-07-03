import { useState } from 'react'
import Header from './component/Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './component/Footer.jsx'


function Layout() {

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
