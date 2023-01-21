import React from 'react'
import ChatItem from './ChatItem'

const ChatList = ({chatItems}) => {
  return (
    <ul className="h-[calc(85vh-140px)] overflow-y-scroll mt-3">
      {chatItems.map((item,i)=><ChatItem key={i} chatItem={item} />
      )}
    </ul>
  )
}

export default ChatList