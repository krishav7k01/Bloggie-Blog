import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
    HiUser,
    HiArrowSmRight,
    HiDocumentText,
    HiOutlineUserGroup,
    HiAnnotation,
    HiChartPie,
  } from 'react-icons/hi';

const DashSidebar = () => {

    const location = useLocation();
    const[tab, setTab] = useState('');
  
    useEffect(()=>{
  
      const urlParams = new URLSearchParams(location.search) //this will give us object from parmas after /dasboard
      const tabFromUrl = urlParams.get('tab');  //this will return ?tab=xx which ever value is there after =
      //? here act as seprator which means URl resource path has end
      if(tabFromUrl)
      {
        setTab(tabFromUrl)
      }
    },[location.search])

    

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>

                <NavLink to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} 
                icon={HiUser}
                label='User'
                labelColor='dark'
                as='div'> 
                    Profile
                </Sidebar.Item>
                </NavLink>
                <Sidebar.Item 
                icon={HiArrowSmRight}
                className='cursor-pointer' > 
                    Sign Out
                </Sidebar.Item>



            </Sidebar.ItemGroup>





        </Sidebar.Items>

    </Sidebar>
  )
}

export default DashSidebar
