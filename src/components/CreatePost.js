import React,{ useState }  from 'react'
import { EditorState,convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { useNavigate } from "react-router-dom";
import article from "../assets/article.svg"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function CreatePost() {

  const Navigate=useNavigate()
  let editorState=EditorState.createEmpty()
  //console.log(editorState)
  const [description,setdescription]=useState(editorState)
  const [title,settitle]=useState('')
  const [file,setfile]=useState()
  const [imgdtls,setimgdtls]=useState([])
  const [imgupload,setimgupload]=useState(false)
  console.log(description)
  const onEditorStateChange=(editorState)=>{
    setdescription(editorState)
  }

  const btn_submit=()=>{
    const data=JSON.parse(localStorage.getItem('creds'))
    let descrp=draftToHtml(convertToRaw(description.getCurrentContent()))
    let inpval={data:{'title':title,'blog_detail':descrp,'users_permissions_user':data.user.id,'image':imgdtls[0].id}}
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",'Authorization': `Bearer ${data.jwt}` },
      body: JSON.stringify(inpval),
    };
    fetch("https://strapi-blog-app-ppdl.onrender.com/api/blogs", requestOptions)
          .then((response) => {
            return response.json()
            })
          .then((data) => {
            if(data){ ;
            Navigate('/home')}
          }).catch((err) => console.log('error'));
    }
    
    const file_upoload_onchange=(event)=>{
      console.log(event.target.files[0])
     setfile(event.target.files[0])
    }

    const image_submit=()=>{
      const formData=new FormData()
      formData.append('files',file)
      const data1=JSON.parse(localStorage.getItem('creds'))
      fetch("https://strapi-blog-app-ppdl.onrender.com/api/upload/", {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${data1.jwt}` ,
            'content-length': file.size},
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        setimgdtls(data)
        setimgupload(true)
      })
      .catch(error => {
        console.error(error)
      })
    }
    
     
  return ( 
  <div className='grid  grid-cols-4 gap-4 items-left bg-cover bg-center  pl-4 min-h-screen bg-slate-100 mr-4'>
  <div className=' col-span-3 flex flex-col justify-left items-left py-4'>
    <h1 className='p-4 outline-2 text-2xl font-bold text-white	capitalize  bg-slate-800 rounded-md' >Create Your Blog !</h1>
    <input value={title} onChange={(e)=>settitle(e.target.value)} className=' border-2 border-cyan-600 rounded-md p-3 outline-2 outline-indigo-500 w-[100%] my-4 ' placeholder='Title'/>
    {/* <label className='my-4 text-xl font-bold  text-white	 border-x-slate-700'> Add Description</label> */}
    <div className='h-96 border-2 border-cyan-600	rounded-md  p-3 overflow-y-auto bg-white	w-[100%]'>
    <Editor
        editorState={description}
        onEditorStateChange={onEditorStateChange}
        
        toolbar={{
          options: ['inline','list','textAlign','link','history','image','colorPicker'], // add the 'fontSize' option to the toolbar
          inline: {
            options: ['bold', 'italic', 'strikethrough','underline']
          },
          list: {            
            options: ['unordered','ordered']
          },
          textAlign:{
            options:['left','right','center','justify']
          },
          link:{
            options:['addlink','removelink']
          },
          history:{
            options:['undo','redo']
          },
          // image :{
          //   url: true,
            
          //   fileUpload: true
          // },
          // 'color-picker': {
          //   icon: 'text-color',
          //   component: CustomColorPickerOption            
          // }
         
        }}
      />
    </div>
    </div>

    <div class=" col-span-1  ">
          <p for="cover-photo" class="  text-xl font-bold leading-6 text-cyan-700 pt-24">Add Cover photo</p>
          <div class="mt-5 flex justify-center w-[250px] bg-white rounded-lg border border-dashed border-gray-900/25 px-2 py-6 w-1/3">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  {imgupload ?<span>File Uploaded</span>:<span>Upload a File</span>}
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" onChange={(e)=>file_upoload_onchange(e)}/>
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              <button className='bg-orange-700 text-white text-sm font-semibold px-3.5 py-2.5 rounded-md my-2' onClick={image_submit}>Upload Photo</button>

            </div>
          </div>
          
          <button type="submit" class="  flex-none   w-[90%] rounded-md bg-orange-700 mt-[80px] px-8.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={btn_submit}>Submit</button>
        </div>
      {/* <button type="submit" class=" w-1/6 flex-none rounded-md bg-black my-3 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={btn_submit}>Submit</button> */}
      </div>

  )
}

export default CreatePost