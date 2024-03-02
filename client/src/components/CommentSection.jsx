import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom'
import {Alert, Button, TextInput} from 'flowbite-react'
import axios from 'axios'
import Comment from './Comment'

const CommentSection = ({postId}) => {

    const{currentUser} = useSelector(state => state.user)
    const[comment,getcommnet] = useState("")
    const[commentError , setcommentError] = useState()
    const[postComment,setPostComment] = useState([])

    useEffect(()=>{

        const fetchComments = async () =>{


         try {
               const res= await axios.get(`/v1/api/comment/getcomments/${postId}`)
   
               const data= await res.data
   
               if(data.success === true)
               {
                   setPostComment(data.data)
               }
         } catch (error) {

            console.log(error.response.data.message)
            
         }


        }


     fetchComments()





    },[postId,comment])

    const handleSubmit = async () =>{

      try {

        setcommentError(null)

          const params = JSON.stringify({
  
              "comment" : comment ,
              "userId" : currentUser._id,
              "postId" : postId
  
          })
  
          const res = await axios.post('/v1/api/comment/create',params,{

            "headers": {
  
              "content-type": "application/json",
            }
            
            
  
          })

          const data = res.data 

          if(data.success === true)
          {
            getcommnet("")
          }


  
      } catch (error) {

        setcommentError(error.response.data.message)


        
      }




    }

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
    { currentUser ?
    (
        <div className="flex flex-row my-6  items-center gap-1 text-gray-500 text-sm">
            <p>Signed in as: </p>
            <img className=" max-w-4 max-h-4 rounded-full object-cover" src={currentUser.profilePhoto} alt={currentUser.userName}/>
            <NavLink className=' text-xs text-cyan-500 hover:underline' to={'/dashboard?tab=profile'}>

                @{currentUser.userName}
            </NavLink>
        </div>
    ) :
    (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
            You must be signed in to comment
            <NavLink className='text-blue-500 hover:underline' to={'/sign-in'}>
                Sign In
            </NavLink>
        </div>
    )
    }

    { currentUser &&  (

        <form className='border border-teal-500 rounded-md p-3'>

        <TextInput 
        placeholder='Add a comment...'
        maxLength='200'
        onChange={(e)=> getcommnet(e.target.value)}
        value={comment}
        />
        <div className=' text-xs text-gray-400 flex justify-between p-4 items-center'>
            <p>{200 - comment.length} caracters remaining</p>
            <Button outline gradientDuoTone='purpleToPink' onClick={handleSubmit}>Submit</Button>
        </div>



        </form>

        
    )

    }

    {commentError && <Alert color='failure' className='mt-5'>{commentError}</Alert>}


    {
       postComment && postComment.length === 0 ? (
            
            <div className="my-5 text-sm">
                Be the first one to comment !!!
            </div>
 
        ) : (
            <>
            <div className="text-sm my-5 flex items-center gap-1 text-gray-500">
                Comments:
                <div className=" border border-gray-500 py-1 rounded-sm p-3">
                  <p> {postComment.length}</p> 
                </div>
            </div>
            {

                postComment.map(comment => (
                    <Comment key={comment._id} comment={comment}/>
                ))

            }
            </>
            

        )


    }











    </div>
  )
}

export default CommentSection
   