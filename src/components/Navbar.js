import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Chat from './Chat'
import Logout from './Logout'
import Search from './Search'


function Navbar() {
    const {currentUser} = useContext(AuthContext)
  return (
    <div className='user'>
        <span>{currentUser.email}</span>
        <Search/>
        <Logout/>
    </div>
  )
}

export default Navbar