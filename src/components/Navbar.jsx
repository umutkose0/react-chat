import React from 'react'
import FeatherIcon from "feather-icons-react"
const Navbar = () => {
  return (
    <div className="flex items-center bg-[#cdcfc666] p-1">
      <div className="flex justify-start flex-1 font-">
      <img className="w-14 border-[1px] border-[#00000047] rounded-full" src="./default.png" />
      </div>
      <div className='flex  justify-end flex-1 items-center'>
        <span className="pr-3">John Doe</span>
        <button className="flex items-center py-1 px-2 border-[1px] opacity-50"><FeatherIcon className="pt-0.5 ml-2 opacity-50"  icon="log-out" /> </button>
       </div>
    </div>
  )
}

export default Navbar