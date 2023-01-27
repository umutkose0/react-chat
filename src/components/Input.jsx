import React from 'react'
import FeatherIcon from 'feather-icons-react'
import { useState } from 'react'
const Input = ({data}) => {
  const [message,setMessage]=useState("");
  
  return (
    <div className='w-[100%] absolute bottom-0 flex py-1.5 bg-[#cdcfc666] '>
      <div className="flex justify-center flex-[7]">
      <input className="w-11/12 rounded-xl border-0" type="text" placeholder="Type a message..."/>
      </div>
      <div className="pr-3 flex justify-center items-center flex-2">
        <span className="mr-3 opacity-50"><FeatherIcon icon="file-plus"/></span>
        <span className="mr-3 opacity-50"><FeatherIcon icon="image"/></span>
        <button className=" border-[1px] border-[rgba(0,0,0,0.2)] py-2 px-7">Send</button>
     </div>
    </div>

  )
}

export default Input