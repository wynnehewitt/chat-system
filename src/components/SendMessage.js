import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'
import { db } from '../firebase'
import {v4 as uuid} from "uuid";

function SendMessage() {
    const [text, setText] = useState("")
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(UserContext)

    const handleSend = async () => {
        await updateDoc(doc(db, "chats", data.chatID), {
            messages: arrayUnion({
                id : uuid(),
                text,
                senderID: currentUser.uid,
                date: Timestamp.now()
            })
        })

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatID + ".lastMessage"]:{
                text
            },
            [data.chatID + ".date"] : serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatID + ".lastMessage"]:{
                text
            },
            [data.chatID + ".date"] : serverTimestamp(),
        });
        setText("")
    };
  return (
    <div className = "sendMessage">
        <input type = "text" placeholder='Type your message here...' 
            onChange = {e => setText(e.target.value)}
            value = {text}/>
        <div className = "send">
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default SendMessage