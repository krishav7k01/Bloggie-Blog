import React from 'react'
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom'

const CommentSection = ({postId}) => {

    const{currentUser} = useSelector(state => state.user)

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
        <div className="div">
            You must be signed in to comment
            <NavLink tp={'/sign-in'}>
                Sign In
            </NavLink>
        </div>
    )




    }
    </div>
  )
}

export default CommentSection
   