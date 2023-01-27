import React,{useContext} from 'react'
import Input from "./Input"
import Messages from './Messages'
import {ChatContext} from "../context/ChatContext"

const Chat = () => {
const {data}=useContext(ChatContext);
  return data.chatId!==null?(
    <div className="chat relative bg-red-100 flex-[5] text-black ">
       <div className="flex items-center bg-[#cdcfc666] p-1">
      <div className="flex items-center justify-start flex-1 ">
      <img className=" h-[63px] mx-3 w-14 border-[1px] border-[#00000047] rounded-full" src={data.user.photoURL} />
      <span className="pr-3">{data.user.displayName}</span>
      </div>
      <div className='flex  justify-end flex-1 items-center'>
        
        <button className="rotate-90 px-2  text-2xl flex text-center justify-center items-center">
          ...
          </button>
       </div>
      </div>
      <Messages data={data}/>
      <Input data={data}/>
    </div>
  )
  :<div className="chat relative flex bg-red-200 flex-[5] text-black justify-center items-center">
   <span className="opacity-6 0 border-2 p-4"> 
    Please select a user
   </span>
  </div>
}

export default Chat