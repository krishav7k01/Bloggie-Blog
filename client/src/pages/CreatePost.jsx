import { Select, TextInput, FileInput, Label, Button } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>

      <h1 className='text-center text-3xl my-7 font-bold'>Create a Post</h1>
      <form className=' flex flex-col gap-4'>
        <div className=' flex flex-col gap-4 sm:flex-row justify-between'>

          <TextInput 
          type='text'
          placeholder='Title'
          required
          id='titile'
          className='flex-1'/>

          <Select id='category'>

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
      <FileInput id="file-upload-helper-text" helperText="SVG, PNG, JPG or GIF" />
      </div>

      <ReactQuill
      theme='snow'
      placeholder='Write something...'
      className='h-72 mb-12'
      required
      id='content'></ReactQuill>

      <Button type='submit' gradientDuoTone='purpleToPink'>
        Publish
      </Button>
  
      </form>
      
    </div>
  )
}

export default CreatePost
