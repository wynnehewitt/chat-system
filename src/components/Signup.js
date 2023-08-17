import React from 'react';
import { useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {auth, db} from "../firebase.js";
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
    <div className='inter loginForm'>
      <div className = 'loginBox pl-10 pr-10 pb-10 pt-10'>
        <div className='text-center'>
        <h1 className='text-3xl font-bold'>Live-Chat System</h1>
        <h3 className='text-xl font-bold'>Sign Up</h3>
        
            <input className='inputBox pl-2 mt-3' 
            type = "email" placeholder = "Email"
          onChange = {(event) =>{
            setRegisterEmail(event.target.value);
            }}/>
            <br/>

          <input className='inputBox pl-2 mt-3' 
          type = "password" placeholder = "Password"
          onChange = {(event) =>{
            setRegisterPassword(event.target.value);
            }}/>
            <br/>

      <input className='inputBox pl-2 mt-3' 
          type = "name" placeholder = "Name"
          onChange = {(event) =>{
            setRegisterName(event.target.value);
            }}/>


            <br/>
            <button className='buttonComponent mt-5 pt-1 pb-1 pl-1 pr-1 mb-3' 
            onClick={signup}>Sign Up</button>

            <p>Have an account?  
              <Link to="/Login">
                <span className='pl-2 text-[#355851]'>
                  <u>
                Login now </u>
                </span>
                </Link></p>
                </div>
          </div>
    </div>
    // <div>
      
    //     <input type = "email" placeholder = "Email"
    //     onChange = {(event) =>{
    //       setRegisterEmail(event.target.value);
    //       }}/>

    //     <input type = "password" placeholder = "Password"
    //     onChange = {(event) =>{
    //       setRegisterPassword(event.target.value);
    //       }}/>

    //     <input type = "name" placeholder = "Name"
    //     onChange = {(event) =>{
    //       setRegisterName(event.target.value);
    //       }}/>

    //       <button onClick={signup}>Sign Up</button>
    //       {/* <button>Sign Up</button> */}
          

    //       <p>Have an account? <Link to="/Login">Login</Link></p>
          
    // </div>
  )
}

export default Signup