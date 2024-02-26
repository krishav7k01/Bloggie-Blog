import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Table } from 'flowbite-react'
import { NavLink } from 'react-router-dom'

const DashPosts = () => {

  const[userPost,setUserPost] = useState([])
 
  const {currentUser} = useSelector(state => state.user)
  

  useEffect(()=>{

    const fetchPost = async () =>{

      try {
        const res = await axios.get(`/v1/api/post/getposts?=${currentUser._id}`)
  
        const data = await res.data


        if(data.success === true)
        {
            setUserPost(data.data.data)
        }
  
      } catch (error) {

        console.log(error.response.data.message)

      }
    }
    if(currentUser.isAdmin)
      {
        fetchPost()
      }


  },[currentUser._id])


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPost.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
         <Table.Head>

          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
         </Table.Head>


         <Table.Body className='divide-y'>
         {userPost.map((post) => (

          
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>

              <Table.Cell>

              <NavLink to={`/post/${post.slug}`}>
                <img
                src={post.postPhoto}
                alt={post.title}
                className='w-20 h-10 object-cover bg-gray-500'></img>
                
              </NavLink>
              </Table.Cell>
              <Table.Cell >
              <NavLink to={`/post/${post.slug}`}>
              <span className='font-medium text-gray-500'>{(post.title).charAt(0).toUpperCase() + (post.title).slice(1) }</span>
              </NavLink>
              </Table.Cell>

              <Table.Cell>{post.category}</Table.Cell>

              <Table.Cell><span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span></Table.Cell>

              <Table.Cell>

              <NavLink className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
              <span>Edit</span>
              </NavLink>


              </Table.Cell>

              </Table.Row>


          


         ))}
         </Table.Body>
        </Table>
        
        
        
        
        
        
        
        </>
      ) : 
      (<p> You Have No Posts</p>) }
    </div>
  )
}

export default DashPosts
