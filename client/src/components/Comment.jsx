import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';

const Comment = ({comment}) => {

  const[user,setUser] = useState({})

  useEffect(()=>{


    const fetchUser = async ()=>{

      try {
        const res = await axios.get(`/v1/api/user/${comment.userId}`);
  
        const data = await res.data
  
        if(data.success === true)
        {
          setUser(data.data)
        }
      } catch (error) {

        console.log(error.response.data.message)

        
      }
    }

fetchUser()


  },[Comment])



  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePhoto} alt={user.userName} />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `@${user.userName}` : 'anonymous user'}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
          <p className=' text-gray-700 mb-2'>     {comment.comment}</p>
        </div>

    </div>
    
  )
}

export default Comment
