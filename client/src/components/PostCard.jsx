import React from 'react'
import { NavLink } from 'react-router-dom'

const PostCard = ({post}) => {
  
  return (
<div className='group relative border  border-teal-500 hover:border-2 h-[280px] overflow-hidden rounded-lg sm:w-[400px] transition-all'>

    <NavLink to={`/post/${post.slug}`}>
    <img src={post.postPhoto} alt="post Cover" className='h-[150px] w-full object-cover group-hover:h-[120px] transition-all duration-300 z-20'></img>
    
    </NavLink>
    <div className='p-3 flex flex-col gap-2'>

    <p className=' text-lg font-semibold line-clamp-2'>{post.title}</p>
    <span className='italic text-sm'>{post.category}</span>
    <NavLink
    to={`/post/${post.slug}`}
    className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-lg  !rounded-tl-none m-2  '>

  Read Article

    </NavLink>

    </div>

</div>

  
  )
}

export default PostCard
