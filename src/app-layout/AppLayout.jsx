import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'


const AppLayout = () => {
  return (
    <>
    <Header/>
    <div className='h-screen'>
        <Outlet/>
    </div>

    </>
  )
}

export default AppLayout