import { Select, TextInput, FileInput, Label, Button, Spinner, Alert} from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {

   
    const {currentUser} = useSelector(state => state.user)
    const[imageFile, setImageFile] = useState()
    const[category,setCategory] = useState()
    const[content,setContent] = useState()
    const[title,setTitle] = useState('')
    const[imageUrl, setImageUrl] = useState()
    const[loading,setLoading] = useState(false)
    const[errorMsg , seterrorMessage] = useState(null)
    const{postId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{

        const fetchPost = async () => {

        try {
        

               
                 const res = await axios.get(`/v1/api/post/getposts?postId=${postId}`)
 
                 const data = await res.data
 
                 if(data.success === true)
                 {
                     const tempPostData = data.data.data[0]
                     setTitle(tempPostData.title)
                     setCategory(tempPostData.category)
                     setImageUrl(tempPostData.postPhoto)
                     setContent(tempPostData.content)
                 }


               }
               
            
               catch (error) {

                console.log(error.response.data.message)
                
               }
        
            }
               fetchPost()  

    },[postId])

    
    const handleSubmit = async (e) =>{
    
      e.preventDefault()
    
    
    
      let form = new FormData()
    
      form.append('userId' , currentUser._id)
      form.append('title' , title)
    
      if(category)
      {
      form.append('category' , category)
      }
      form.append('content' , content)
      form.append('postPhoto' , imageFile)
      
    
     try {
    
      setLoading(true)
     
       const res = await axios.put(`/v1/api/post/update/${postId}/${currentUser._id}` , form,
       {
         headers : { 'content-type' : 'multipart/form-data' }
       })
    
       const data = res.data
       
        
       if(data.success ===  true)
       {
        setLoading(false)
        navigate('/dashboard?tab=posts')
       }
        
       
     } catch (error) {
    
      setLoading(false)
      seterrorMessage(error.response.data.message)
      
     }
    
    }
    
    
      return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    
          <h1 className='text-center text-3xl my-7 font-bold'>Create a Post</h1>
    
        
    
          <form className=' flex flex-col gap-4'  encType='multipart/form-data' onSubmit={(handleSubmit)}>
            <div className=' flex flex-col gap-4 sm:flex-row justify-between'>
    
              <TextInput 
              type='text'
              placeholder='Title'
              required
              id='title'
              className='flex-1'
              onChange={(e)=> setTitle(e.target.value)}
              value={title}
                />
    
              <Select id='category' onChange={(e) => setCategory(e.target.value)} required value={category}>
    
            <option value='uncategorized'>Select a Category</option>
            <option value='React'>React</option>
            <option value='ExpressJs'>ExpressJs</option>
            <option value='Configuration'>Configuration</option>
            <option value='Javascript'>Javascript</option>
    
            
              </Select>
              </div>
              <div>
              <div>
            <Label htmlFor="file-upload-helper-text" value="Upload file" />
          </div>
          <FileInput type='file' id="postPhoto" accept='image/*' required onChange={(e)=> { setImageFile(e.target.files[0]); setImageUrl(URL.createObjectURL(e.target.files[0])) }} helperText="SVG, PNG, JPG or GIF" />
          </div>
    
          {imageUrl && (
              <img
                src={imageUrl}
                alt='upload'
                className='w-full h-72 object-fit'
              />
            )}
    
          <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => setContent(value)}
          value={content}></ReactQuill>
    
          <Button type='submit' gradientDuoTone='purpleToPink' outline disabled={loading}>
            {
          loading ? (
          <>
          <Spinner size='sm'/> 
           <span className='pl-3'>Loading...</span>
           </>)
            : 'Update Post'
           
      
      }
          </Button>
      
          </form>
          
    
    {errorMsg && (
            <Alert color='failure' className='mt-5 items-center'>
              {errorMsg}
            </Alert>
          )}
        </div>
      )
}

export default UpdatePost
