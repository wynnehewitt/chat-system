import React, { useContext } from 'react'
import {auth} from "../firebase.js";
import {signOut} from 'firebase/auth';
import { UserContext } from '../context/UserContext.js';

function Logout() {

  const { dispatch} = useContext(UserContext);

    const logout = async () => {

      dispatch({type: "CLEAR_USER"});
        await signOut(auth);
        console.log("Successfully logged out");
      };
  return (
    <div>
        <button className = "logoutButton text-xs" 
                onClick={logout}>Log Out</button>
    </div>
  )
}

export default Logout