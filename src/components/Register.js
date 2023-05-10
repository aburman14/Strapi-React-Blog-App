import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({setuserexists}) {

    const Navigate=useNavigate()
    const [inpval, setinp] = useState({ username: "", email: "", password: "" });
    const handlesubmit = (e) => {
    e.preventDefault();
    
        user_register();
      };
    
    function user_register() {
      console.log('is it running')
        console.log(JSON.stringify(inpval));
        const temp_values={"username":'abc1',"email":'abc1@gmail.com',"password":'testuser'}
        // console.log(temp_values)
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inpval),
        };
        fetch("https://strapi-blog-app-ppdl.onrender.com/api/auth/local/register", requestOptions)
          .then((response) => {
            console.log(response)
            if(response.status===200){
              console.log('suceess')
              localStorage.setItem("creds",inpval);
            return response.json()
            }
            else{
            Navigate('/')
            }
        })
          .then((data) => {
            if(data){ 
              console.log('is is here!')
              localStorage.setItem("creds",JSON.stringify(data));
            Navigate('/home')}
          }
            )
          .catch((err) => console.log('error'));
    }
  

  return (
    <div className="flex flex-row  justify-center items-center  m-auto  w-[65%]  h-96    border-2 border-t-[1px]  pt-[100px] border-gray-200 rounded-md shadow-lg shadow-gray-200">
          <div className="w-[500px] radial-bg h-96 rounded-md ">
            <div className=" backdrop-blur-md	bg-white/30 my-24 mx-4 rounded-md">
            <h1 className="text-white font-bold px-4 py-4">Welcome To <span className="icon text-orange-500">Bl<span className="text-cyan-400">o</span>g It <span className="text-white">!</span></span></h1>
            <p className="text-white p-4">Lorem ipsum dolor sit amet. Qui omnis ratione est tenetur voluptates eos eveniet harum cum distinctio voluptas ab aliquid illo sed </p>
            
            </div>
            {/* Hello This is for Image  */}
          </div> 
          <div className="h-96 w-[500px]  px-10 bg-white rounded-md flex flex-col  justify-center">              
           <form >
                {/* <label htmlFor="username" className="sr-only mt-4 "> User Name</label> */}
                <p className="font-bold py-2 text-orange-700 ">User Name</p>
                <input
                  id="username"
                  value={inpval.username}
                  name="username"
                  type="text"
                  onChange={(e) =>
                    setinp({ ...inpval, username: e.target.value })
                  }
                  className="relative block w-full rounded-md  border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

              {/* <div className="mt-4"> */}
                {/* <label htmlFor="email-address" className="sr-only">
                  Email address
                </label> */}
                <p className="font-bold py-2 text-orange-700 ">Email</p>

                <input
                  id="email-address"
                  value={inpval.email}
                  name="email"
                  type="email"
                  onChange={(e) => setinp({ ...inpval, email: e.target.value })}
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-sms  border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                  
                />
              {/* </div> */}
              {/* <div className="mt-4"> */}
                {/* <label htmlFor="password" className="sr-only">
                  Password
                </label> */}
               <p className="font-bold py-2 text-orange-700 ">Password</p>
                <input
                  id="password"
                  value={inpval.password}
                  name="password"
                  onChange={(e) =>
                    setinp({ ...inpval, password: e.target.value })
                  }
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-md border-0 py-2 .5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              {/* </div> */}

            <div className="flex items-center justify-between">
              {/* <div className="flex items-center"> */}
                {/* <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                /> */}
                {/* <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label> */}
              {/* </div> */}

                <button type="button" onClick={()=>setuserexists(true)}
                  className=" p-4 font-bold text-cyan-700 hover:text-indigo-500">
                  Already a Member?
                </button>
            </div>

            <div>
              <button type="button"
                onClick={(e)=>handlesubmit(e)}
                className="group relative flex w-full justify-center rounded-md bg-gray-800 text-text-color py-2 px-3 text-sm font-semibold text-white hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="#ffffff"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Register
              </button>
            </div>
          </form> 
          </div>
      </div>
  );
};

  


export default Register