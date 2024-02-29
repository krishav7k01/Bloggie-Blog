import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button, Table, Modal, Alert } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';



const DashUsers = () => {

    const[getUser,setGetUsers] = useState([])
    const {currentUser} = useSelector(state => state.user)
    const[showMore,setShowMore] = useState(true)
    const[userId,setUserId]= useState(null)
    const[showModal, setShowModal]= useState(false)     


    useEffect(()=>{

        const fetchPost = async () =>{
    
          try {
            const res = await axios.get(`/v1/api/user/getusers`)
      
            const data = await res.data
    
    
            if(data.success === true)
            {
                setGetUsers(data.data.userWithoutPassword)
                if((data.data.userWithoutPassword.length) < 9)
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
    
        const startIndex = getUser.length
    try {
      
          const res = await axios.get(`/v1/api/user/getusers?startIndex=${startIndex}`)
      
          const data = res.data
      
          if(data.success === true)
          {
      
            setGetUsers((prev) => [...prev, ...data.data.userWithoutPassword])
            if((data.data.userWithoutPassword.length) < 9)
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
           const res = await axios.delete(`/v1/api/user/admindelete/${userId}`)
     
           const data = res.data
     
           if(data.success === true)
           {
             
            setGetUsers((prev) => prev.filter((user) => user._id !== userId ))
             
           }
     
         } catch (error) {
    
          console.log(error.response.data.message)
          
         }
    
    
          
    
    
      }
    
    
    
    
      return (
        <div className='table-auto w-full   overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-700 dark:scrollbar-thumb-slate-500'>
          {currentUser.isAdmin && getUser.length > 0 ? (
            <>
            <Table hoverable className='shadow-md'>
             <Table.Head>
    
              <Table.HeadCell>Create Date</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>IsAdmin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
             </Table.Head>
    
    
             <Table.Body className='divide-y'>
             {getUser.map((User) => (
    
              
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={User.userName}>
                  <Table.Cell>{new Date(User.createdAt).toLocaleDateString()}</Table.Cell>
    
                  <Table.Cell>
    
              
                    <img
                    src={User.profilePhoto}
                    alt={User.userName}
                    className='w-20 h-10 object-cover bg-gray-500'></img>
                    
                  
                  </Table.Cell>
                  <Table.Cell >
                 
                  <span className='font-medium text-gray-500'>{ User.userName }</span>
                  
                  </Table.Cell>
    
                  <Table.Cell>{User.email}</Table.Cell>
    
    
                  <Table.Cell>
                    {User.isAdmin ? <FaCheck/> : <FaTimes/>}
                    
                    </Table.Cell>
    
                    <Table.Cell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer' onClick={(e) => { setUserId(User._id); setShowModal(true)   }}>Delete</span></Table.Cell>
    
                 
    
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
          (<p> You Have No Users</p>) }
    
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

export default DashUsers
