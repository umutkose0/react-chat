import React from 'react'
import ChatList from './ChatList'
import Navbar from "./Navbar"
import Search from "./Search"
const Sidebar = () => {
  return (
    <div className="sidebar relative  flex-[2] border-r-[1px] border-[rgba(0,0,0,0.2)]">
      <Navbar/>
      <Search/>
      <ChatList chatItems={[1,2,3,4,5,6,7,8,9,10,11,12]}/>
  
      </div>
  )
}

export default Sidebar