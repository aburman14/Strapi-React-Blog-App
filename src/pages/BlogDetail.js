import React from 'react'
import { useParams } from 'react-router-dom'
import avatar_male from '../assets/avatar_male.svg'
import useGetblogs from '../hooks/useGetblogs'

const BlogDetail = () => {

  

    const { id } = useParams();
    // console.log(id)
    const {data} = useGetblogs(id);
    // console.log('hello',data)

     
    // console.log(id)
    // const data=useGetblogs()

  return (
    <main className='m-10 bg-slate-100'>
        <p className='font-bold p-4 text-red-700'>Published on <span className= 'text-slate-400 pl-10 text-[12px]'>{data.post_created}</span> </p>
        <h1 className='text-5xl font-bold py-8 pl-8 pr-8 rounded-md text-gray-100 capitalize bg-slate-900 '>{data.title} </h1>
        <div className='flex flex-row justify-items-center items-center	gap-3'>
            <img src={avatar_male} className='h-10'/>
            <div>
            <p className='capitalize font-bold pt-[12px] text-md'>{data.postedby} </p>
            <p className=' text-red-700'>Designation</p>
            </div>
        </div>
        <div>
            <img src={data.imgurl}  alt="test" className=' m-auto object-fit my-10 h-96  w-1/8 pr pr-20' />
            <p className='text align-middle pl-24 pr-24 pb-14 pt-8 bg-white border-2	border-slate-100 rounded-md	' dangerouslySetInnerHTML={{__html:data.blog_detail}}></p>
        </div>

    </main>
  )
}

export default BlogDetail