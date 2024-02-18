import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const Signup = () => {

  const [formData , setFormData] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange =  (e) =>  {

    setFormData({...formData, [e.target.id] : e.target.value})

  }

  const handleSubmit = async (e) =>{
    
    e.preventDefault();

    try{
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/v1/api/user/signup', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData),
      });

      const data = await res.json();

      if(data.success === false)
      {
        setErrorMessage(data.message)
      }

      if(data.success === true)
      {   
          navigate('/sign-in')
      }

      setLoading(false)
    }
    catch(error)
    {   
        setErrorMessage(error.message)
        setLoading(false)
    }

  }
  
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
    {/*left */}
    <div className='flex-1'>
      <NavLink
      to="/"
      className='font-bold dark:text-white text-4xl'
      >
         <span className='px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>BLoggie</span>
         Blog
      </NavLink>

      <p className='text-sm mt-5'> 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste itaque facilis molestiae in iusto optio rerum odio nostrum odit quo?
      </p>
    </div>
{/* Right */}

<div className="flex-1">

<form className='flex flex-col gap-4' onSubmit={handleSubmit}>

  <div>
    <Label value='Your Username' />
    <TextInput type='text' placeholder='Username' id='userName' onChange={handleChange} required></TextInput>
  </div>

  <div>
    <Label value='Your Email' />
    <TextInput type='email' placeholder='Email' id='email' onChange={handleChange} required></TextInput>
  </div>

  <div>
    <Label value='Your Password' />
    <TextInput type='password' placeholder='Password' id='password'  autoComplete="on" onChange={handleChange} required></TextInput>
  </div>

  <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}> 
  {
    loading ? (
      <>
      <Spinner size='sm'/> 
       <span className='pl-3'>Loading...</span>
       </>)
        : 'Sign Up'
  
  }
  </Button>
  <OAuth/>
</form>

<div className="flex gap-3 text-sm mt-5">
  <span>Have a Account</span>
  <NavLink to='/sign-in' className='text-blue-500'>Sign In</NavLink>
</div>

{ errorMessage &&
  (<Alert className='mt-5' color='failure'>
  {errorMessage}
  </Alert>)
}


</div>



    </div>
    </div>
  )
}

export default Signup
