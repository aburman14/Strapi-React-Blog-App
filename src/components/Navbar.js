import React from 'react';
import {  useNavigate,Link  } from 'react-router-dom'

import { PencilSquareIcon,ArrowTrendingUpIcon,ArrowLeftOnRectangleIcon,Squares2X2Icon,FaceSmileIcon } from '@heroicons/react/24/solid'

const Navbar = () => {

  const Navigate=useNavigate()

  const user_logout=()=>{
    localStorage.clear()
    Navigate('/')
  }


  const modalopen=()=>{
    Navigate('/home/createpost')
  }
  return (          
    <div className=' my-32 grid grid-rows-5 h-96	bg-white place-content-center'>
      {/* <img src={logo} className='h-[67px] translate-y-[-100px] bg-orange-600 rounded-md'/> */}
      <p className='icon text-3xl text-orange-700 font-bold mt-[-100px]'>Bl<span className='text-cyan-500'>o</span>g It!</p>
      {/* <img src={menu} className='h-7'/> */}
      <Link to ="/home">
      <Squares2X2Icon className="text-cyan-700 h-7 cursor-pointer hover:translate-x-[2px]" />
      </Link>
      {/* <img src={trend} className ='border-2	border-black	rounded-md	p-1 h-7'/> */}
      <ArrowTrendingUpIcon className="text-cyan-700 h-7 border-2	border-cyan-500	rounded-md cursor-pointer hover:translate-x-[2px]" />
      {/* s */}
      <Link to='/home/myposts'>
      <FaceSmileIcon className='h-7 text-cyan-700 cursor-pointer hover:translate-x-[2px]' />
      </Link>
      {/* <img src={edit_data} className='h-7 cursor-pointer hover:translate-x-[2px]' onClick={modalopen} /> */}      
      <PencilSquareIcon className="text-cyan-700  h-7 cursor-pointer hover:translate-x-[2px]" onClick={modalopen}  />
      <ArrowLeftOnRectangleIcon className='text-cyan-700 0 h-7 cursor-pointer hover:translate-x-[2px]' onClick={user_logout}/>
      {/* <img src={logout} className='h-7 cursor-pointer hover:translate-x-[2px] ' onClick={user_logout} /> */}
    </div>
  )
}
export default Navbar

