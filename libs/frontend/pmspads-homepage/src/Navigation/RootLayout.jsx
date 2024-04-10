/* eslint-disable no-unused-vars */
import React from 'react'
import Header from '../Components/header'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}

export default RootLayout