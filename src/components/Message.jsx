import React from 'react'

const Message = ({reciever}) => {
  return reciever?(
    <div className="flex">
      <div className='flex justify-center ml-5 my-5 max-w-md  rounded-lg bg-white'>
        <span className="mr-2 p-2">
          Same  message recieved...
        </span>
        <span className="flex flex-col justify-end pb-1 pr-2 text-xs opacity-60">
            19:20
        </span>
      </div>
    </div>
  ):(
  <div className="flex flex-row-reverse">
    <div className='flex justify-center ml-5 my-5 max-w-md  rounded-lg bg-[#b3ff89]'>
    <span className="mr-2 p-2">
    Same message sent... 
    </span>
    <span className="flex flex-col justify-end pb-1 pr-2 text-xs opacity-60">
        01:06
    </span>
    </div>
  </div>
)
}

export default Message