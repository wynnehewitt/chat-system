import React from 'react'
import { auth } from '../firebase'

const style = {
    message: 'flex items-center shadow-xl',
    name: 'fixed text-gray-600',
    sent: 'text-gray-500',
    received: 'text-gray-900'
}

function Message({message}) {
  const messageClass = message.uid === auth.currentUser.uid
  ? '${style.sent}'
  : '${style.received}'
  return (
    <div>
        <div className={`${style.message} ${messageClass}`}>
        <p className={style.name}>{message.name}</p>
        <p>{message.text}</p>
      </div>
    </div>
  )
}

export default Message