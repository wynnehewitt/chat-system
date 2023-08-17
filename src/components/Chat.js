import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Messages from './Messages';
import SendMessage from './SendMessage';

function Chat(){
    const { data } = useContext(UserContext);
  return (
    <div className = "chat">
        <span>ChatRoom</span>
        <div className = "chatInfo">
            <span>{data.user?.name}</span>
        </div>
        <Messages/>
        <SendMessage/>
    </div>
  )
}

export default Chat