import React from 'react'
import { useParams } from 'react-router-dom'
import avatar_male from '../assets/avatar_male.svg'
import useGetblogs from '../hooks/useGetblogs'

const BlogDetail = () => {

  

    const { id } = useParams();
    console.log(id)
    // console.log(id)
    // const data=useGetblogs()

  return (
    <main className='m-16'>
        <p>Published on </p>
        <h1 className='text-5xl font-bold py-8 '>This is the Testing Heading </h1>
        <div className='flex flex-row justify-items-center items-center	gap-3'>
            <img src={avatar_male} className='h-10'/>
            <div>
            <p>Blogger's Name</p>
            <p>Designation</p>
            </div>
        </div>
        <div>
            <img src={" "} />
            <p>Blog detail in set mark down</p>
        </div>

    </main>
  )
}

export default BlogDetail