import React, {useState} from 'react';
import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../firebase.js";
import {Link, useNavigate} from 'react-router-dom';

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
    <div className='inter loginForm'>
      <div className = 'loginBox pl-10 pr-10 pb-10 pt-10'>
        <div className='text-center'>
        <h1 className='text-3xl font-bold'>Live-Chat System</h1>
        <h3 className='text-xl font-bold'>Login</h3>
        
            <input className='inputBox pl-2 mt-3' 
            type = "email" placeholder = "Email"
          onChange = {(event) =>{
            setLoginEmail(event.target.value);
            }}/>
            <br/>

          <input className='inputBox pl-2 mt-3' 
          type = "password" placeholder = "Password"
          onChange = {(event) =>{
            setLoginPassword(event.target.value);
            }}/>

            <br/>
            <button className='buttonComponent mt-5 pt-1 pb-1 pl-1 pr-1 mb-3' 
            onClick={login}>Login</button>

            <p>Don't have an account?  
              <Link to="/Signup">
                <span className='pl-2 text-[#355851]'>
                  <u>
                Sign up now </u>
                </span>
                </Link></p>
                </div>
          </div>
    </div>
    
  )
}

export default Login