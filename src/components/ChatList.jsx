import React, { useContext ,useState,useEffect} from 'react'
import ChatItem from './ChatItem'
import {AuthContext} from "../context/AuthContext"
import { db } from '../firebase';
import { doc, onSnapshot } from "firebase/firestore";
const ChatList = () => {
  const {currentUser}=useContext(AuthContext);
  const [chats,setChats]=useState();
  useEffect(()=>{
  try
  {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
     setChats(doc.data());
    });
    return ()=>{
      unsub();
    }
  }
  catch(e)
  {
    console.log(e.message)
  }
  },[currentUser.uid])
  return (
    chats?
    <ul className="chat-list h-[calc(85vh-140px)] overflow-y-scroll mt-3">
      {Object.entries(chats).map((item,i)=><ChatItem key={item[0]} chatItem={item[1]} />
      )}
    </ul>
    :<div className="flex justify-center text-center items-center h-[40vh] p-3">
    <span className="opacity-60 px-3">Start a new chat with email</span>   
    
    </div>
  )
}

export default ChatList