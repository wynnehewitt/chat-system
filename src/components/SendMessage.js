import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import React, {useState} from 'react';
import {auth, db} from '../firebase'

const style = {
    form: 'text-xl',
    button: 'bg-orange-500',
    input: 'text-gray-800'
}
function SendMessage() {
    const [input, setInput] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault()
        const {uid, displayName} = auth.currentUser
        await addDoc(collection,(db, 'messages'), {
            text:input,
            name:displayName,
            uid,
            timestamp: serverTimestamp()
        })
    }
     
  return (
    <form onSubmit = {sendMessage} className = {style.form}>
        <input value = {input} onChange = {(e) => setInput(e.target.value)}
        className = {style.input} placeholder = "Your message here..."/>
        <button className={style.button} type = "submit">Send</button>
    </form>
  )
}

export default SendMessage