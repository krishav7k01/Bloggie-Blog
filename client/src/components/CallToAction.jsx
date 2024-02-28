import React from 'react'
import { Button } from 'flowbite-react';

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-3xl  text-center '>
      <div className=" flex-1 justify-center flex flex-col">
      <h2 className='text-2xl'>
                CheckOut My Projects
            </h2>
            <p className='text-gray-500 my-2'>
                Cool Cool Projects
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-xl'>
                <a href="#" target='_blank' rel='noopener noreferrer'>
                    Portfolio
                </a>
            </Button>

      </div>
      <div className="p-7 flex-1">
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
        </div>
    </div>
  )
}

export default CallToAction
