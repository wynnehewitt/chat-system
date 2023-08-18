import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';

 
function Message({message}) {
  const ref = useRef()
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    ref.current?.scrollIntoView({behaviour:"smooth"})
  }, [message]);
  const sentTime = message.date.toDate().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });



  console.log(message)
  return (
    <div ref  = {ref}
      className = "">
          <div className='mt-5 messageContent'>
              <span className={`${message.senderID === currentUser.uid ? "owner" : "sender"}`}>{message.text}</span>
          </div>

          <div className = "mb-5 messageInfo">
            <span className='text-xs ml-2'>{sentTime}</span>
          </div>

          </div>
  )
}

export default Message