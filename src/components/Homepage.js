import React from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'

function Homepage() {
  return (
    <div className='homepage inter'>
      <div className='flex ml-10 mr-10'>
        <div className='flex-none mt-10 w-1/3'>
          <div className = 'sidebar'>
            <Sidebar/>
          </div>
        </div>

        <div className='flex-none  h-2/3'>
          <div className='chatRoom'>
            <Chat/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage