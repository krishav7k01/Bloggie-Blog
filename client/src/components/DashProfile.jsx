import { Alert, Button, Modal, TextInput, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFailure, deleteStart, deleteSuccess, signoutSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios'
import { useRef } from 'react'


const DashProfile = () => {

    const{currentUser,loading, error } = useSelector(state => state.user)
    
    const[success,setSuccess] = useState()
    const[showModal,setShowModal] = useState(false)
    const[image, setImage] = useState()
    const[imageUrl, setImageUrl ] = useState(currentUser.profilePhoto)
    const filePicker = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const handleSubmit = async (e) =>{

      e.preventDefault()
      setSuccess(null)
     

    let formData = new FormData()

    formData.append('userName' , e.target.userName.value)
    formData.append('email' , e.target.email.value)
    formData.append('profilePhoto' , image)

    


      try{

        dispatch(updateStart())
        const res = await axios.post(`/v1/api/user/update/${currentUser._id}`,formData,
        {
        headers: { 'content-type' : 'multipart/form-data'
        }

        })

        const data = await res.data

        if(data.success == true)
        {
          
          dispatch(updateSuccess(data.data))
          setSuccess(data.message)

        }

      }
      catch(error)
        {

          dispatch(updateFailure(error.response.data.message));

        }







    }

    const handleDelete = async(e) => {

      try{

          dispatch(deleteStart)
          const res = await fetch(`/v1/api/user/delete/${currentUser._id}`,
          {
            method: 'DELETE'
          })

          const data = await res.json()

          if(data.success == true)
          {
            navigate("/")
            dispatch(deleteSuccess(null))
          }
          else
          {

            dispatch(deleteFailure(data.message))

          }

      }
      catch(error)
      {
        dispatch(deleteFailure(data.message))
      }




    }

    const handleLogout = async(e) =>{

      try{

        const res = await fetch(`/v1/api/user/logout/${currentUser._id}`,
        {
          method : 'POST'
        })

        const data =  await res.json()

        if(data.success)
        {
          dispatch(signoutSuccess(data.data))
          navigate("/")
        }

      }
      catch(error){
        console.log(error)
      }
       

    }



    
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      
      <h1 className='my-12 text-center font-semibold text-4xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={(handleSubmit)} encType='multipart/form-data'>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
        <img src={imageUrl} alt='User' className='rounded-full w-full h-hull object-cover border-8 border-[lightgray]' onClick={() => filePicker.current.click()}/>
        </div>

        <input type='file' id='profilePhoto' onChange={(e) => {setImage(e.target.files[0]); setImageUrl(URL.createObjectURL(e.target.files[0]))} } ref={filePicker} hidden></input>
        <TextInput type='text' id='userName' placeholder='username' defaultValue={currentUser.userName} />
        <TextInput type='email' id='email' placeholder='username' defaultValue={currentUser.email} /> 

        <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading}>{
    loading ? (
      <>
      <Spinner size='sm'/> 
       <span className='pl-3'>Loading...</span>
       </>)
        : 'Update the User'
  
  }</Button>
        { currentUser.isAdmin && <Button type='button' gradientDuoTone='purpleToBlue' outline onClick={() =>{
          navigate('/create-post')
        }}>Create a Post</Button>}
      </form>
      
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={() => setShowModal(true)}>Delete Account</span> 
        <span className='cursor-pointer ' onClick={handleLogout}>Sign Out</span> 

      </div>

      {success && (
        <Alert color='success' className='mt-5'>
          {success}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
        )}

        
        <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'>

          <Modal.Header/>
          <Modal.Body>

          <div className="text-center">

          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
          
          <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
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

export default DashProfile
