import React, { useState,useEffect } from 'react'

export const useDebouce = (value,delay=500) => {

  const [debounced,setdebounced]=useState(value)


  useEffect(() => {
    let id=setTimeout(() => {
      console.log('setting new timeout')
      setdebounced(value)
    }, delay);
  
    return () => {
      console.log('clearing previous timeout')
      clearTimeout(id)
    }
  }, [value,delay])
  
    
  return debounced
}
