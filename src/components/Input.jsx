import React, { useEffect, useRef } from 'react'
import FeatherIcon from 'feather-icons-react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import {sendMessage,sendGif} from "../firebase"
import {SearchContextManager} from '@giphy/react-components'
import {GiphyComponents} from "./GiphyComponents"

const Input = ({data}) => {
  const {currentUser}=useContext(AuthContext)
  const [text,setText]=useState("");
  const [width,setWidth]=useState(680);
  const gifArea=useRef();
  useEffect(()=>{
    window.addEventListener("resize",calcWidth);
  },[])

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
  const giphyToggle=async(e)=>{
    gifArea.current.classList.toggle("hidden");
    
  }
  const calcWidth=()=>{
    setWidth(gifArea.current.clientWidth);
  }
  const handleGifClick=async(gif)=>{
    console.log(gif);
    
      const message={
        uid:currentUser.uid,
        type:"gif",
        gif:gif.id,
        date:Date.now()
      };
      console.log(message);
    await sendGif(data.chatId,message)
    giphyToggle()
  }
  return (
    <>
    <div ref={gifArea} onLoad={calcWidth}  className="gif-box overflow-y-scroll hidden  w-[100%] h-[300px] bg-white bottom-12 absolute">
    <SearchContextManager  apiKey={process.env.REACT_APP_giphyApiKey}>
        <GiphyComponents width={width} handleGifClick={handleGifClick} />
    </SearchContextManager>
    </div>
    <div className='w-[100%] absolute bottom-0 flex py-1.5 bg-[#cdcfc666] '>
      <form className="flex w-[100%]" onSubmit={messageHandle}>
        <div className="flex justify-center flex-[5]">
        <input id="message" value={text} onChange={(e)=>setText(e.target.value)} className=" w-[95%] rounded-xl border-0" type="text" placeholder="Type a message..."/>
        </div>
        
        <div  className="pr-3 flex justify-center items-center flex-3">
          <span onClick={giphyToggle} className="mr-1 opacity-50 cursor-pointer hover:opacity-75"><FeatherIcon icon="image"/></span>
          <button type="submit" className=" border-0 py-1 px-2 opacity-50 hover:opacity-75"><FeatherIcon icon="send"/></button>
      </div>
     </form>
    </div>
    </>
  )
}

export default Input