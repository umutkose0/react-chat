import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
const Message = ({message}) => {
  const {currentUser}=useContext(AuthContext);

  return currentUser.uid!==message.uid?(
    <div className="flex">
      <div className='flex justify-center ml-5 my-5 max-w-md  rounded-lg bg-white'>
        <span className="mr-2 p-2">
          {message.text}
        </span>
        <span className="flex flex-col justify-end pb-1 pr-2 text-xs opacity-60">
            {new Date(message.date).getHours()+":"+new Date(message.date).getMinutes()}
        </span>
      </div>
    </div>
  ):(
  <div className="flex flex-row-reverse">
    <div className='flex justify-center ml-5 my-5 max-w-md  rounded-lg bg-[#b3ff89]'>
    <span className="mr-2 p-2">
    {message.text}
    </span>
    <span className="flex flex-col justify-end pb-1 pr-2 text-xs opacity-60">
      {new Date(message.date).getHours()+":"+new Date(message.date).getMinutes()}
    </span>
    </div>
  </div>
)
}
export default Message