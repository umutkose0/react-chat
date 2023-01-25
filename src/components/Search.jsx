import React,{useEffect, useRef,useState,useContext} from 'react'
import { searchUser } from '../firebase';
import {AuthContext} from "../context/AuthContext"
const Search = () => {
  const {currentUser}=useContext(AuthContext);
  const userRef=useRef();
  const [search,setSearch]=useState("");
  const [result,setResult]=useState("");
  const focusHandle=()=>{
    userRef.current.classList.remove("invisible");
  }
  const blurHandle=()=>{
     setTimeout(()=>{
      userRef.current.classList.add("invisible");
      setResult("");
      setSearch("");
    },200)
    
  }
  const clickHandle=async ()=>{
    console.log(result);
    
  }
  useEffect(()=>{
    (async()=>{
      if(search.includes("@") && search.includes("."))
      {
        const r= await searchUser(search)
        setResult();
        r.forEach((doc)=>{
          //console.log(doc.data());
          setResult(doc.data());
        })
      }
      else{
        setResult();
      }
     
    })()
  },[search])
  return (
    <>
    <div className="flex justify-center">
      <input value={search} onChange={(e)=>setSearch(e.target.value)}  onBlur={blurHandle} onFocus={focusHandle} className="w-[100%] border-0 mt-2 border-b-[1px] border-[rgba(0,0,0,0.15)]" type="text" placeholder="Find a user with email"  />
      </div>
      {result?
      
      <div onClick={clickHandle} ref={userRef} className="hover:bg-red-500 cursor-pointer absolute invisible text-white w-[100%] bg-red-300 z-10 p-1 border-[1px] border-[rgba(0,0,0,0.1)] flex items-center">
        <div>
        <img className="flex ml-1 my-1 mr-4 rounded-full w-12" src={ result.photoURL || "./default.png"}/>
        </div>

        <div className="flex flex-col">
        <span className="font-semibold">{result.displayName}</span>
        <span className="font-semibold opacity-50"></span>
        </div> 
        <span className='flex flex-1 pr-4 opacity-50 text-sm justify-end items-center'>
            {result.email}
        </span>
      
      </div>
    :
    <div ref={userRef} className="hover:bg-red-500 cursor-pointer absolute invisible text-white w-[100%] bg-red-300 z-10 p-1 border-[1px] border-[rgba(0,0,0,0.1)] flex items-center">
      {result==""?"search with email":"Please check the email address"}
      </div>}
    </>
    
  )
}

export default Search