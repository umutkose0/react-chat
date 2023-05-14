import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { GiphyFetch } from '@giphy/js-fetch-api'
const Message =({message}) => {
  
  const {currentUser}=useContext(AuthContext);
  const [gif,setGif]=useState("");
  useEffect(()=>{
    (async()=>{
    if(message?.type=="gif"){
      const gf=new GiphyFetch(process.env.REACT_APP_giphyApiKey);
      const gif=await gf.gif(message.gif);
      setGif(gif);
      console.log(gif);
    }
  })()
  },[])
  
  
  return currentUser.uid!==message.uid?(
    <div className="flex">
      <div className='flex justify-center ml-5 my-5 max-w-md  rounded-lg bg-white'>
        <span className=" p-2">
          {gif?<img className=" rounded-lg" src={gif.data.images.downsized_medium.url} />:""}
          {message.text}
        </span>
        {gif?"":
        <span className="flex flex-col justify-end pb-1 pr-2 text-xs opacity-60">
          {new Date(message.date).getHours()+":"+new Date(message.date).getMinutes()}
        </span>
        }
      </div>
    </div>
  ):(
  <div className="flex flex-row-reverse">
    <div className='flex justify-center ml-5 my-5 max-w-md  rounded-lg bg-[#b3ff89]'>
    <span className=" p-2">
    {gif?<img className=" rounded-lg" src={gif.data.images.downsized_medium.url} />:""}
    {message.text}
    </span>
    {gif?"":
    <span className="flex flex-col justify-end pb-1 pr-2 text-xs opacity-60">
      {new Date(message.date).getHours()+":"+new Date(message.date).getMinutes()}
    </span>
    }
    </div>
  </div>
)
}
export default Message