import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Spinner } from 'flowbite-react'
import CallToAction from '../components/CallToAction'
import CommentSection from '../components/CommentSection'

const PostPage = () => {

    const {postSlug} = useParams()
    const[post,setPost] = useState([])
    const[loading,setLoading]= useState(true)

  useEffect(()=>{

    const fetchPostBySlug = async () => {
  try {
    setLoading(true)
      
      const res = await axios.get(`/v1/api/post/getposts?slug=${postSlug}`)
      const data = await res.data
  
      if(data.success === true)
      {
        setPost(data.data.data[0])
        setLoading(false)
      }

  
      

  } 
  catch (error) {

    setLoading(false)
    console.log(error.response.data.message)
    
  }
  
}

  fetchPostBySlug()
  

  },[postSlug])



  if (loading)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl' />
    </div>
  );


if(!loading)
  return(

    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>

      <h1 className=' text-3xl mt-10 p-3 text-center font-serif max-w-2xl lg:text-4xl mx-auto'>

    {post.title}
      </h1>

    <NavLink to="#" className='self-center mt-5'>

    <Button color='gray' pill size='xs'>
      {post.category}
    </Button>
    </NavLink>

    <img
    src={post.postPhoto}
    alt={post.title}
    className='mt-10 p-3 max-h-[600px] w-full object-fill'/>


    <div className=' flex justify-between w-full p-3 border-b border-slate-700 mx-auto max-w-3xl text-xs text-gray-400'>

      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      <span className=' italic'>{(post.content.length/1000).toFixed(0)} mins read</span>

    </div>

    <div className='p-3 max-w-3xl mx-auto w-full post-content'
    dangerouslySetInnerHTML={{ __html: post.content}}>
    </div>

    <div className='max-w-4xl mx-auto w-full'>
        <CallToAction/>
      </div>

      <CommentSection postId={post._id}/>


    </main>


  )

}

export default PostPage
