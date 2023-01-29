import React, { useContext ,useState,useEffect} from 'react'
import ChatItem from './ChatItem'
import {AuthContext} from "../context/AuthContext"
import {ChatContext} from "../context/ChatContext"
import { db } from '../firebase';
import { doc, onSnapshot } from "firebase/firestore";
const ChatList = () => {
  const {currentUser}=useContext(AuthContext);
  const {dispatch}=useContext(ChatContext);
  const [chats,setChats]=useState();
  const handleSelect=(user)=>{
    dispatch({type:"CHANGE_USER",value:user.userInfo});
    const sidebar=document.querySelector(".sidebar");
    sidebar.style.visibility="hidden";
    const btnShow=document.querySelector(".navbar-button");
    btnShow.classList.add("show-navbar");
    const btnClose=document.querySelector(".navbar-button-2");
    btnClose.classList.remove("close-navbar");
  }
  useEffect(()=>{
  try
  {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
     setChats(Object.entries(doc.data()));
     
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
      {chats.sort((a,b)=>b[1].lastMessage?.date?.seconds - a[1].lastMessage?.date?.seconds)
      .map((item)=><ChatItem handleSelect={handleSelect} key={item[0]} chatItem={item[1]} />
      )}
    </ul>
    :<div className="flex justify-center text-center items-center h-[40vh] p-3">
    <span className="opacity-60 px-3">Start a new chat with email</span>   
    </div>
  )
}

export default ChatList