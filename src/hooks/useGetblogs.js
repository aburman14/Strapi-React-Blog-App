import axios from "axios"; 
import { useEffect, useState } from "react";

const useGetblogs = (id) => {
  const server_name='http://localhost:1337'
  const [data,setdata]=useState({'imgurl':'','postedby':'',title:'',blog_detail:'',post_created:''})

  useEffect(() => {
    
    getdata(id)

    async function getdata (){
      const response = await axios.get(`https://strapi-blog-app-ppdl.onrender.com/api/blogs/${id}?populate=*`);
      let post=response.data.data.attributes
      console.log(post)
      // users_permissions_user.data.attributes.username
      let img_url=post?.image?.data?.attributes?.url || ''
      let postedby=post.users_permissions_user.data.attributes.username
      let title=post.title
      let blog_detail=post.blog_detail
      const options = { month: 'long', day: '2-digit', year: 'numeric' };
      console.log(typeof post.createdAt )
      const post_created=new  Date(post.createdAt)
      const formattedDate = post_created.toLocaleDateString('en-US', options)
      // let post_created=post.createdAt
      console.log()
      setdata({'imgurl':img_url,'postedby':postedby,title,blog_detail,post_created:formattedDate})
    }
  }, [id])
  
  // const getdata=async (id)=>{
  //   const response = await axios.get(`http://localhost:1337/api/blogs/${id}?populate=*`);
  //  let post=response.data.data.attributes
  //  let img_url=server_name+post?.image?.data?.attributes?.url || ''
  //  return img_url
  // }





  return {data}

}

export default useGetblogs