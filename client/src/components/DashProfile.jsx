import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFailure, deleteSuccess, signoutSuccess, updateFailure, updateSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';


const DashProfile = () => {

    const{currentUser} = useSelector(state => state.user)
    
    const[formData, setFormData] = useState({userName : currentUser.userName , email : currentUser.email })
    const[error,setError] = useState()
    const[success,setSuccess] = useState()
    const[showModal,setShowModal] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const handleChange = (e) =>{

      setFormData({...formData , [e.target.id] : e.target.value})

    }

    const handleSubmit = async (e) =>{

      e.preventDefault()
      setError(null)
      setSuccess(null)

    

      try{

        const res = await fetch(`/v1/api/user/update/${currentUser._id}`,
        {
          method: 'PUT',
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify(formData),
        });

        const data = await res.json()

        if(data.success == true)
        {
          
          dispatch(updateSuccess(data.data))
          setSuccess(data.message)

        }
        else
        {

            dispatch(updateFailure(data.message));
            setError(data.message)

        }
        


      }
      catch(error)
        {

          dispatch(updateFailure(error.message));
          setError(error.message);

        }







    }

    const handleDelete = async(e) => {

      try{

          const res = await fetch(`/v1/api/user/delete/${currentUser._id}`,
          {
            method: 'DELETE'
          })

          const data = await res.json()

          if(data.success == true)
          {
            navigate("/")
            dispatch(deleteSuccess(data.data))
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
      <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">


        <img src={currentUser.profilePhoto} alt='User' className='rounded-full w-full h-hull object-cover border-8 border-[lightgray]' />
        </div>
        <TextInput type='text' id='userName' placeholder='username' defaultValue={currentUser.userName} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='username' defaultValue={currentUser.email} onChange={handleChange}/> 

        <Button type='submit' gradientDuoTone='purpleToBlue' outline> Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={() => setShowModal(true)}>Delete Account</span> 
        <span className='cursor-pointer' onClick={handleLogout}>Sign Out</span> 

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
