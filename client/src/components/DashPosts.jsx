import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button, Table, Modal, Alert } from 'flowbite-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashPosts = () => {

  const[userPost,setUserPost] = useState([])
  const {currentUser} = useSelector(state => state.user)
  const[showMore,setShowMore] = useState(true)
  const[postId,setPostId]= useState(null)
  const[showModal, setShowModal]= useState(false)
  

  useEffect(()=>{

    const fetchPost = async () =>{

      try {
        const res = await axios.get(`/v1/api/post/getposts?userId=${currentUser._id}`)
  
        const data = await res.data


        if(data.success === true)
        {
            setUserPost(data.data.data)
            if((data.data.data.length) < 9)
            {
              setShowMore(false)
            } 
            
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

  const getMore = async () =>{

    const startIndex = userPost.length
try {
  
      const res = await axios.get(`/v1/api/post/getposts?=${currentUser._id}&startIndex=${startIndex}`)
  
      const data = res.data
  
      if(data.success === true)
      {
  
        setUserPost((prev) => [...prev, ...data.data.data])
        if((data.data.data.length) < 9)
        {
          setShowMore(false)
        } 
  
  
      }
} catch (error) {

  console.log(error.response.data.message)
  
}


  }

  const handleDelete = async () =>{

      setShowModal(false)
     try {
       const res = await axios.delete(`/v1/api/post/deleteuser/${postId}/${currentUser._id}`)
 
       const data = res.data
 
       if(data.success === true)
       {
         
        setUserPost((prev) => prev.filter((post) => post._id !== postId ))
         
       }
 
     } catch (error) {

      console.log(error.response.data.message)
      
     }


      


  }




  return (
    <div className='table-auto w-full   overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-700 dark:scrollbar-thumb-slate-500'>
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

          
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={post.slug}>
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


              <Table.Cell>
                <span className='font-medium text-red-500 hover:underline cursor-pointer' onClick={(e) => { setPostId(post._id); setShowModal(true)   }}>Delete</span></Table.Cell>

              <Table.Cell>

              <NavLink className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
              <span>Edit</span>
              </NavLink>


              </Table.Cell>

              </Table.Row>

         ))}
         </Table.Body>
        </Table>
        
        {showMore && (

      <Button className=' w-full text-black-900 self-center text-sm py-8 border-none' gradientDuoTone='gray' onClick={getMore}>
          Show More
        </Button>

          ) }
        </>
      )  : 
      (<p> You Have No Posts</p>) }

          <Modal
          show={showModal}
          onClose={()=> setShowModal(false)}
          popup
          size='md'
          >

            <Modal.Header/>

            <Modal.Body>


            <div className="text-center">

          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
          
          <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your Post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>


            </Modal.Body>

      

          </Modal>
          

    </div>


  )




}

export default DashPosts
