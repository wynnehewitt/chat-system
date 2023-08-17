import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'


 
function Message({message}) {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(UserContext)

  const ref = useRef()

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
    className = {'message ${message.senderID === currenUser.uid && "owner"}'}>
        <div className = "messageInfo">
          <span>{sentTime}</span>
        </div>
        <div className='messageContent'>
            <p>{message.text}</p>
        </div>
        
    </div>
  )
}

export default Message