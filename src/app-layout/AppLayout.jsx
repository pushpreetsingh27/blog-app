import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const AppLayout = () => {
  return (
    <>
    <Header/>
    <div className='h-screen'>
        <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default AppLayout