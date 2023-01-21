import Sidebar from "./../components/Sidebar"
import Chat from "./../components/Chat"
import React from 'react'

function Home() {
  return (
    <>
      <div className="container flex bg-white w-4/5 h-[85vh]   mt-12   ">
        <Sidebar/>
        <Chat/>
      </div>
    </>
  )
}

export default Home 