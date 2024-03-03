import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';

const Comment = ({comment, onLike, onEdit,onDelete}) => {

  const[user,setUser] = useState({})
  const{currentUser} = useSelector(state => state.user)
  const[isEditing, setIsEditing] = useState(false)
  const[editedComment, setEditedComment] = useState()

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

  const handleEdit = async (commentId) =>{

   try {
     const params = JSON.stringify({
 
       "comment" : editedComment
     })
 
     const res = await axios.put(`/v1/api/comment/editcomment/${commentId}`, params,
     {
       "headers": {
   
         "content-type": "application/json",
       }
     }
     )
 
     const data = await res.data
 
     if(data.success === true)
     {
       setIsEditing(false)
       onEdit(comment, editedComment)
     }
   } catch (error) {

    console.log(error.response.data.message)
    
   }
  }



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

          { isEditing ? (
<>
<textarea 
        className=' w-full border border-gray-500 rounded-lg'
        maxLength='200'
        rows='2'
        onChange={(e)=> setEditedComment(e.target.value)}
        value={editedComment}
        />


<div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                onClick={() => {handleEdit(comment._id)}}
              >
                Save
              </Button>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>

</>

          ) : (
            <>
            <p className=' text-gray-700 mb-2'> {comment.comment}</p>
          <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
            <button type='button' onClick={()=> onLike(comment._id)}  className={`text-gray-400 hover:text-blue-500 ${
              currentUser && comment.likes.includes(currentUser._id) &&  '!text-blue-500'
            }`}>
              <FaThumbsUp className= 'text-sm'/>
            </button>

            <p>
            { comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
            </p>
            
            {
              currentUser && currentUser._id === comment.userId &&
              <button onClick={()=>{setIsEditing(true); setEditedComment(comment.comment) }}
              type='button' className=' text-gray-400 hover:text-red-500'>
                Edit
              </button>
}

{
    currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && 
    <button type='button' className=' text-gray-400 hover:text-red-500' onClick={()=> onDelete(comment._id)} >
      Delete
    </button>

}
             
          </div>
          </>

         
  )}
        </div>
  

    </div>
    
  )
}

export default Comment
