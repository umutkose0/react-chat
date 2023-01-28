import { doc, onSnapshot } from 'firebase/firestore';
import {useState,useEffect} from 'react'
import { db } from '../firebase';
import Message from "./Message"
const Messages = ({data}) => {
  const [messages,setMessages]=useState([]);
  useEffect(()=>{
    const unsub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
      //console.log(doc.data().messages)
    })
    return ()=>{
      unsub();
    }
  },[data.chatId])
  useEffect(()=>{
    const msgDiv=document.querySelector(".messages")
    msgDiv.scroll({
        top: msgDiv.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
  },[messages])
  
  return (
    <div className=" py-3 pl-5 pr-10 h-[calc(85vh-120px)] max-md:h-[calc(100vh-120px)] messages overflow-y-scroll overflow-x-hidden">
        {Object.entries(messages).map((message)=><Message key={message[0]} message={message[1]}/>)}
    </div>
  )
}

export default Messages