import React, { useEffect, useState } from 'react'
import {  useNavigate,Link, Outlet  } from 'react-router-dom'
import Loader from './Loader'
import Input from './Input'
import { useDebouce } from '../hooks/useDebouce'
import avatar_male from '../assets/avatar_male.svg'
import Navbar from './Navbar';
import Landing from './Landing'

import { PencilSquareIcon,ArrowTrendingUpIcon,ArrowLeftOnRectangleIcon,Squares2X2Icon,FaceSmileIcon } from '@heroicons/react/24/solid'

// import BlogDetail from '../pages/BlogDetail';

const Home = ({loading,setisedit}) => {
  const Navigate=useNavigate()

 const[allposts,setallposts]=useState([])

 //input search state variable
 const [search,setsearch]=useState('') 
 
 //custom hook use debounce is called to have the controlled input debounced for 1000 ms
 const debounced_val=useDebouce(search,1000)
 
 
 const server_name='http://localhost:1337'
  const getposts=()=>{
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };
    fetch("https://strapi-blog-app-ppdl.onrender.com/api/blogs?populate=*", requestOptions)
      .then((response) => {
        if(response.status===200){
        return response.json()
        }
    })
      .then((res) => setallposts(res.data))
      .catch((err) => console.log('error'));
  }

  const user_logout=()=>{
    localStorage.clear()
    Navigate('/')
  }

  const modalopen=()=>{
    Navigate('/createpost')
  }

  useEffect(() => {

    getposts();
    
  }, [])


  useEffect(()=>{

    // console.log(search)
    console.log(search)

  },[debounced_val])

const edit=(id)=>{
  console.log(id)
  setisedit(true)
  // modalopen()
  Navigate(`/editpost/${id}`)

//   let token=JSON.parse(localStorage.getItem('creds')).jwt
//   let user_id=JSON.parse(localStorage.getItem('creds')).user.id
//   let inpval={
//     data:{
//     'title': 'Test code',
//     'blog_detail': '<strong>testing in detail</strong>',
//     "users_permissions_user":user_id
//     }
//   }
  
//   fetch(`http://localhost:1337/api/blogs/${id}`, {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}` 
//   },
//   body: JSON.stringify(inpval)
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('Data updated successfully:', data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

}


if(loading){
  return (
    <Loader />
  )
}  
  
return (
  <div className='grid  grid-cols-[15%_85%] divide-x mt-4 bg-white ' >
    {/* <div className=' my-32 grid grid-rows-5 h-96	bg-white place-content-center'> */}
    {/* <img src={logo} className='h-[67px] translate-y-[-100px] bg-orange-600 rounded-md'/> */}
    {/* <p className='icon text-3xl text-orange-700 font-bold mt-[-100px]'>Bl<span className='text-cyan-500'>o</span>g It!</p> */}
    {/* <img src={menu} className='h-7'/> */}
    {/* <Squares2X2Icon className="text-cyan-500 h-7 cursor-pointer hover:translate-x-[2px]" /> */}
    {/* <img src={trend} className ='border-2	border-black	rounded-md	p-1 h-7'/> */}
    {/* <ArrowTrendingUpIcon className="text-cyan-500 h-7 border-2	border-cyan-500	rounded-md cursor-pointer hover:translate-x-[2px]" /> */}
    {/* s */}
    {/* <FaceSmileIcon className='h-7 text-cyan-500 cursor-pointer hover:translate-x-[2px]' /> */}
    {/* <img src={edit_data} className='h-7 cursor-pointer hover:translate-x-[2px]' onClick={modalopen} /> */}
    

    {/* <PencilSquareIcon className="text-cyan-500  h-7 cursor-pointer hover:translate-x-[2px]" onClick={modalopen}  /> */}
    {/* <ArrowLeftOnRectangleIcon className='text-cyan-500 0 h-7 cursor-pointer hover:translate-x-[2px]' onClick={user_logout}/> */}
    {/* <img src={logout} className='h-7 cursor-pointer hover:translate-x-[2px] ' onClick={user_logout} /> */}
    {/* </div> */}
    <Navbar />
    {/* <nav className="bg-[#be123c] text-text-color ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-end">
          <div className="flex items-center">          
            <div className="hidden md:block">
              <div className="flex items-center ">
                <a href="#" className="text-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>
                <button onClick={user_logout}className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Logout</button>
              </div>
            </div>
          </div>        
        </div>
      </div>
     
    </nav> */}

    {/* <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex gap-20">
        <h1 className="text-3xl capitalize font-bold tracking-tight text-gray-900">Welcome, {JSON.parse(localStorage.getItem('creds')).user.username}</h1>
        <button className="rounded-full bg-amber-700 text-neutral-50 font-bold p-2" onClick={modalopen}>Create New Post</button>
        <Input search={search} setsearch={setsearch} debounced_val={debounced_val}/>
      </div>
    </header> */}
   {/* <Landing  loading ={loading} setedit={setisedit} /> */}
   <Outlet />
  </div>

)
}
export default Home

