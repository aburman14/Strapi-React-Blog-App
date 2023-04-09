import React from 'react'

function Protected({children}) {
   // console.log(JSON.parse(localStorage.getItem('creds')))
   if(localStorage.getItem('creds')){
   return children
   }
  
}

export default Protected