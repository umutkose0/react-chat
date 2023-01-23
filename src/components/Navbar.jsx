import React from 'react'
import FeatherIcon from "feather-icons-react"
import { logOut } from '../firebase';
const showSidebar=(e)=>{
  //e.target.style.opacity="0";
  e.target.classList.remove("show-navbar");
  //e.target.classList.add("invisible");
  let sidebar=document.querySelector(".sidebar");
  sidebar.style.visibility="visible";
  document.querySelector(".navbar-button-2").classList.add("close-navbar");
}
const hideSidebar=(e)=>{
  e.target.style.visibility="hidden!important";
  e.target.classList.remove("close-navbar");
  let sidebar=document.querySelector(".sidebar");
  sidebar.style.visibility="hidden";
  document.querySelector(".navbar-button").classList.add("show-navbar");
}
const logoutHandle=async()=>{
  const r=await logOut()
}
const Navbar = () => {
  return (
    <div className="flex items-center bg-[#cdcfc666] p-1">
      <div onClick={showSidebar} className="navbar-button show-navbar invisible absolute rotate-90 text-xl font-bold">|||</div>
      <button onClick={hideSidebar}className="navbar-button-2  invisible">X</button>
      <div className="flex justify-start flex-1 font-">
      <img className="w-14 border-[1px] border-[#00000047] rounded-full" src="./default.png" />
      </div>
      <div className='flex  justify-end flex-1 items-center'>
        <span className="pr-3">John Doe</span>
        <button onClick={logoutHandle} className="flex items-center py-1 px-2 border-[1px] opacity-50">
          <FeatherIcon className="pt-0.5 ml-2 opacity-50"  icon="log-out" />
        </button>
       </div>
    </div>
  )
}

export default Navbar