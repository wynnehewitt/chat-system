import React from 'react'
import {auth} from "../firebase.js";
import {signOut} from 'firebase/auth';

function Logout() {
    const logout = async () => {
        await signOut(auth);
        console.log("Successfully logged out");
      };
  return (
    <div>
        <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default Logout