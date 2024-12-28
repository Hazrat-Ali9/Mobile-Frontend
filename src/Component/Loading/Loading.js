// Loading js
import React from 'react'
import loader from '../Images/loader.gif'
const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <img style={{width: "350px" , height:"350px"}} src={loader} alt="" />
    </div>
  )
}

export default Loading