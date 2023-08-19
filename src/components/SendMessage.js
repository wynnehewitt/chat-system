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

        // update the last message of the private chat in the current user collection
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatID + ".lastMessage"]:{
                text
            },
            [data.chatID + ".date"] : serverTimestamp(),
        });

        // update the last message of the private chat in the other user collection
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
        <div className='flex'>
            <div className='flex-none ml-5 mr-5'>
                <input className='messageInput'
                        type = "text" placeholder='Type your message here...' 
                        onChange = {e => setText(e.target.value)}
                        value = {text}/>
            </div>
        <div className = "flex-none send">
            <button className='sendButton'
                    onClick={handleSend}>Send</button>
        </div>
        </div>
    </div>
  )
}

export default SendMessage