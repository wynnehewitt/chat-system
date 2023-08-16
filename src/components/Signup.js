import React from 'react';
import { useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from "../firebase.js";
// import {ref, set} from "firebase/database";
import {doc, setDoc} from "firebase/firestore";
import {Link, useNavigate} from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();
    
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");

    const [user, setUser] = useState({});

    React.useEffect(() => {
      onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser)
      })
    },[])


    const signup = async () =>{
      try{
        //return a promise
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword,
          registerName
        );
        navigate("/")
        console.log(user);

        await setDoc(doc(db, "users", user.user.uid), {
          uid: user.user.uid,
          email: registerEmail,
          password: registerPassword,
          name: registerName
        });

        await setDoc(doc(db, "userChats", user.user.uid), {});
        navigate("/");

      } catch (error) {
        console.log(error.message);
      }
    };


  return (
    <div>
      
        <input type = "email" placeholder = "Email"
        onChange = {(event) =>{
          setRegisterEmail(event.target.value);
          }}/>

        <input type = "password" placeholder = "Password"
        onChange = {(event) =>{
          setRegisterPassword(event.target.value);
          }}/>

        <input type = "name" placeholder = "Name"
        onChange = {(event) =>{
          setRegisterName(event.target.value);
          }}/>

          <button onClick={signup}>Sign Up</button>
          {/* <button>Sign Up</button> */}
          

          <p>Have an account? <Link to="/Login">Login</Link></p>
          
    </div>
  )
}

export default Signup