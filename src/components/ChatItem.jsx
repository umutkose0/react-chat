import React from 'react'

function ChatItem({handleSelect,chatItem}) {
  //console.log(chatItem)
  return (
   <li onClick={()=>{handleSelect(chatItem)}} className="hover:bg-[rgba(0,0,0,0.1)]">
    <div className="p-1 border-b-[1px] border-[rgba(0,0,0,0.1)] flex items-center">
        <div>
        <img className="flex ml-1 my-1 mr-4 rounded-full w-12" src={chatItem.userInfo.photoURL}/>
        </div>

        <div className="flex flex-col">
        <span className="font-semibold">{chatItem.userInfo.displayName}</span>
        <span className="font-semibold opacity-50">message</span>
        </div> 
        <span className='flex flex-1 pr-4 opacity-50 text-sm justify-end items-center'>
        
        </span>
    </div>
   </li>
  )
}

export default ChatItem