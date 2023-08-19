import React from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'

function Homepage() {
  return (
    <div className='homepage inter h-screen'>
      <div className='homepageFlex flex pt-10 pb-10 ml-10 mr-10 mb-10'>
        <div className='sidebarClass flex-none w-1/3 rounded-l-lg'>
          <div className = 'pl-5 pt-5 pr-5'>
            <Sidebar/>
          </div>
        </div>

        <div className='chatRoomFlex flex-none w-2/3 rounded'>
            <Chat/>
        </div>
      </div>
    </div>
  )
}

export default Homepage