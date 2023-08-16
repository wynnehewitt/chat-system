import React, {useState} from 'react';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../firebase.js";
import {Link, useNavigate} from 'react-router-dom';
import Logout from './Logout.js';


function Login() {

    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    React.useEffect(() => {
      onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser)
      })
    },[])


    const login = async() => {
      try{
        //return a promise
        const user = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        navigate("/")
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
    };



  return (
    <div>
          <input type = "email" placeholder = "Email"
        onChange = {(event) =>{
          setLoginEmail(event.target.value);
          }}/>

        <input type = "password" placeholder = "Password"
        onChange = {(event) =>{
          setLoginPassword(event.target.value);
          }}/>

          <button onClick={login}>Login</button>

          <h3>Logged in as:</h3>
          {user?.email}

          <Logout/>
          <p>You don't have an account? <Link to="/Signup">Sign up</Link></p>

    </div>
    
  )
}

export default Login