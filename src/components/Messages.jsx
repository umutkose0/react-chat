import React from 'react'
import Message from "./Message"
const Messages = () => {
  return (
    <div className=" py-3 pl-5 pr-10 h-[calc(85vh-120px)] max-md:h-[calc(100vh-120px)] messages overflow-y-scroll">
        <Message reciever={true}/>
        <Message reciever={false}/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message reciever={true}/>
    </div>
  )
}

export default Messages