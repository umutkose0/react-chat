import React from 'react'
import FeatherIcon from 'feather-icons-react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import {sendMessage} from "../firebase"
const Input = ({data}) => {
  const {currentUser}=useContext(AuthContext)
  const [text,setText]=useState("");
 
  const messageHandle=async(e)=>{
    e.preventDefault();
    if(text.trim()!="")
    {
      const message={
        uid:currentUser.uid,
        text,
        date:Date.now()
      };
      setText("")
    await sendMessage(data.chatId,message)
    document.querySelector("#message").focus()
      
    }
  }
  return (
    <div className='w-[100%] absolute bottom-0 flex py-1.5 bg-[#cdcfc666] '>
      <form className="flex w-[100%]" onSubmit={messageHandle}>
        <div className="flex justify-center flex-[7]">
        <input id="message" value={text} onChange={(e)=>setText(e.target.value)} className=" w-[95%] rounded-xl border-0" type="text" placeholder="Type a message..."/>
        </div>
        <div  className="pr-3 flex justify-center items-center flex-2">
          <span className="mr-3 opacity-50 invisible absolute"><FeatherIcon icon="file-plus"/></span>
          <span className="mr-3 opacity-50 invisible absolute"><FeatherIcon icon="image"/></span>
          <button type="submit" className=" border-[1px] border-[rgba(0,0,0,0.2)] py-2 px-4">Send</button>
      </div>
     </form>
    </div>

  )
}

export default Input