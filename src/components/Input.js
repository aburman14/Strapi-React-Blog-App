import React, { useState,useEffect } from 'react'
// import { useDebouce } from '../hooks/useDebouce'

function Input({search,setsearch,debounced_val}) {

    // const [search,setsearch]=useState('')
    // const debounced_val=useDebouce(search,1000)

  useEffect(() => {
    
    // console.log(debounced_val)
    // console.log(search)
    setsearch(debounced_val)
  }, [debounced_val])
  



  return (
    <div>
  {/* <label for="price" class="block text-lg font-medium  text-gray-900">Search Posts </label> */}
  <div class="relative mt-2 rounded-md shadow-sm p-3  h-24">
    
    <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)}  
    class="block w-80 rounded-3xl border-0 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Enter Something"/>
    {/* <div class="absolute inset-y-0 right-0 flex items-center">
      
    </div> */}
  </div>
</div>
  )
}

export default Input