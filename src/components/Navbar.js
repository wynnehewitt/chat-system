import { doc, getDoc } from 'firebase/firestore';
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Logout from './Logout'


function Navbar() {
    const {currentUser} = useContext(AuthContext)

  return (
    <div className='user'>
        <span>{currentUser.email}</span>
        <Logout/>
    </div>
  )
}

export default Navbar