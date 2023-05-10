import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {  useNavigate,Link, Outlet  } from 'react-router-dom'

const Myposts = () => {

    const [myposts,setmyposts]=useState([])

    const getmyposts=async()=>{
            //const data = { username, email, password };
            const user=JSON.parse(localStorage.getItem('creds')).user
            console.log(user)
            try {
              const response = await axios.get('https://strapi-blog-app-ppdl.onrender.com/api/blogs?populate=*');
              //console.log(response.data.data.attributes)
              const temp =response.data.data.filter((item)=>item.attributes.users_permissions_user.data.id===user.id)
              setmyposts(temp)
            } 
            catch (error) {
              console.log(error);
            }
          
    }

    useEffect(() => {
      getmyposts()
          
    }, [])
    


  return (
    <div className='grid  grid-cols-[80%_20%] mb-8'>
    <div className='bg-gradient-to-r from-gray-50 to-gray-100'>
    <p className='text-3xl capitalize p-3 font-bold text-white bg-gray-800 rounded w-[60%] my-20'>Your Posts!</p>
   
    < div className='flex flex-column flex-wrap items-baseline gap-x-5'>
    {
      myposts.map((post,id)=>{
        // let img_url=server_name+post.attributes?.image?.data?.attributes?.url || ''
        let posted_by=post.attributes.users_permissions_user.data.attributes.username
        let logged_in=JSON.parse(localStorage.getItem('creds')).user.username        
          return (
            <main key={post.id} className='my-4 ml-10  border-t-4 border-cyan-500 shadow-md h-[394px] w-[25rem] cursor-pointer bg-white p-4 pb-4 rounded-md'>
              {/* <img src={img_url} alt="test" className='rounded-md object-cover my-2 h-48  w-96' />
               */}
              <div >
                <h3 className='text-2xl font-bold capitalize my-2 text-orange-800'>{post.attributes.title.substring(0,30)}</h3>
                <p className='h-[90px]'>{post.attributes.blog_detail.replace( /(<([^>]+)>)/ig, '').substring(0,100)}</p>
                <div className='flex flex-row gap-x-2'>
                  {/* <img src={avatar_male} className='h-[30px] self-center' /> */}
                  <p >by<span className='capitalize font-bold pl-2'>{posted_by}</span> </p>
                  <p>{post.attributes.post_created}</p>
                  <Link to={`/home/posts/${post.id}`}>Read More...</Link>
                  
                </div>
              </div>
            </main>
          )
      })
    }
    </div>
    </div>
   
    </div>
  )
}

export default Myposts