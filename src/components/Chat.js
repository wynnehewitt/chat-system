import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Messages from './Messages';
import SendMessage from './SendMessage';

function Chat() {
  const { data } = useContext(UserContext);
  
  return (
    <div className="flex flex-col h-full">
  <div className="chat flex-col h-2/3">
    <div className="chatInfo pl-5 pt-2 h-10">
      <span className="text-xl text-[#FFFFFF]">{data.user?.name}</span>
    </div>

    <div className="flex-none pl-5 allMessages">
      <Messages />
    </div>
  </div>

  <div className="flex-none messageInputBox h-1/3">
    <SendMessage />
  </div>
</div>
  )
}

export default Chat
