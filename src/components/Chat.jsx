import React from 'react'
import Input from "./Input"
import Messages from './Messages'
const Chat = () => {
  return (
    <div className="chat relative bg-red-100 flex-[5] text-black ">
       <div className="flex items-center bg-[#cdcfc666] p-1">
      <div className="flex items-center justify-start flex-1 ">
      <img className="mx-3 w-14 border-[1px] border-[#00000047] rounded-full" src="./default.png" />
      <span className="pr-3">John Doe</span>
      </div>
      <div className='flex  justify-end flex-1 items-center'>
        
        <button className="rotate-90 px-2  text-2xl flex text-center justify-center items-center">
          ... 
          </button>
       </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat