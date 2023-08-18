import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Logout from './Logout'


function Navbar() {
    const {currentUser} = useContext(AuthContext)

  return (
    <div className='user'>
      <h1 className='text-xl'>Welcome back!</h1>
        <div className='flex mb-5'>
          <div className='flex-1'>
          <span> <u>
            {currentUser.email} </u></span>
          </div>
          <div className='flex-1'>
            <Logout/>
          </div>
        </div>
    </div>
  )
}

export default Navbar