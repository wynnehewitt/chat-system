import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Messages from './Messages';
import SendMessage from './SendMessage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Chat() {
  const { data } = useContext(UserContext);
  
  return (
    <div className="flex flex-col">
      <div className="chat rounded flex-col">
        <div className="chatInfo rounded-tr-lg items-center pl-5 pt-1 h-10">
          <span className='text-xl'><AccountCircleIcon></AccountCircleIcon></span>
          <span className="ml-3 text-xl">{data.user?.name}</span>
        </div>

        <div className="allMessages overflow-y-scroll h-80 pl-5">
          <Messages />
        </div>
      </div>

      <div className="messageInputBox rounded-br-lg p-5 flex-none">
        <SendMessage />
      </div>
</div>
  )
}

export default Chat
