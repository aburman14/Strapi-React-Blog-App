import React, { useEffect, useState } from 'react'
import {  useNavigate,Link  } from 'react-router-dom'
import Loader from './Loader'
import Input from './Input'
import { useDebouce } from '../hooks/useDebouce'
import avatar_male from '../assets/avatar_male.svg'

const Landing = ({loading,setisedit}) => {


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
       Navigate('/home/createpost')
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
     Navigate(`/${id}`)
   
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
    <div className='grid  grid-cols-[80%_20%] mb-8'>
    <div className='bg-gradient-to-r from-gray-50 to-gray-100'>
    <Input search={search} setsearch={setsearch} debounced_val={debounced_val}/>
    <p className='text-3xl capitalize p-3 font-bold text-white bg-gray-800 rounded w-[60%]	'>Article of the day</p>
    <main  className='my-2 mx-10  w-[50%] shadow-md  bg-white rounded-xl border-1 border-t-2 border-slate-200	 '>
                {/* <img  alt="test" className=' bg-white rounded-md object-cover my-2 h-56 shadow-2xl shadow-gray-300' /> */}
                <h1 class=" p-4 font-bold text-3xl text-orange-700 top-[223px] left-[305px]  capitalize pr-4 pl-[2rem]">Lorem ipsum dolor sit</h1>
                <p class=" text-cyan-700 text-s  pl-[1rem] pt-[1rem]">It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing .</p>
                <button class=" my-10 mx-10 bg-orange-700 text-white	rounded-full p-2 text-sm font-bold">Read More</button>
            </main>
    <h1 className='text-2xl font-bold capitalize p-3'>Top Match For you</h1>
    < div className='flex flex-column flex-wrap items-baseline gap-x-5'>
    {
      allposts.map((post,id)=>{
        let img_url=post.attributes?.image?.data?.attributes?.url || ''
        let posted_by=post.attributes.users_permissions_user.data.attributes.username
        let logged_in=JSON.parse(localStorage.getItem('creds')).user.username        
          return (
            <main key={post.id} className='my-4 ml-10  border-t-4 border-cyan-500 shadow-md h-[394px] w-[25rem] cursor-pointer bg-white p-4 pb-4 rounded-md'>
              <img src={img_url} alt="test" className='rounded-md object-cover my-2 h-48  w-96' />
              
              <div >
                <h3 className='text-2xl font-bold capitalize my-2 text-orange-800'>{post.attributes.title.substring(0,30)}</h3>
                {/* <p className="capitalize" dangerouslySetInnerHTML={{__html: post.attributes.blog_detail}}></p> */}
                <p className='h-[90px]'>{post.attributes.blog_detail.replace( /(<([^>]+)>)/ig, '').substring(0,100)}</p>
                <div className='flex flex-row gap-x-2'>
                  <img src={avatar_male} className='h-[30px] self-center' />
                  <p >by<span className='capitalize font-bold pl-2'>{posted_by}</span> </p>
                  <p>{post.attributes.post_created}</p>
                  <Link to={`/home/posts/${post.id}`}>Read More...</Link>
                  {/* <div className='flex flex-row gap-4'>
                  { logged_in === posted_by ? 
                  <span onClick={()=>edit(post.id)} className='cursor-pointer py-12'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg></span> :null}
                  <span className='py-12'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg></span>
                  </div> */}
                </div>
              </div>
            </main>
          )
      })
    }
    </div>
    </div>
    <div className='flex flex-row place-items-baseline py-4'>
    <img src={avatar_male} className='h-[60px] pl-[10px] 	' />
    <p className='capitalize  translate-y-[-16px] font-bold pl-[8px]	'>{JSON.parse(localStorage.getItem('creds')).user.username}</p>
    </div>
    </div>
  )
}

export default Landing