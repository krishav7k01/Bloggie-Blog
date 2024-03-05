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
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice.js';

const DashSidebar = () => {

    const location = useLocation();
    const[tab, setTab] = useState('');
    const {currentUser} = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    useEffect(()=>{
  
      const urlParams = new URLSearchParams(location.search) //this will give us object from parmas after /dasboard
      const tabFromUrl = urlParams.get('tab');  //this will return ?tab=xx which ever value is there after =
      //? here act as seprator which means URl resource path has end
      if(tabFromUrl)
      {
        setTab(tabFromUrl)
      }
    },[location.search])

    const handleSignOut = async() =>{

     try {
       const res = await axios.post(`/v1/api/user/logout/${currentUser._id}`)
 
       const data = await res.data
 
       if(data.success === true)
       {
         navigate('/')
        dispatch(signoutSuccess(null))
       }
       
     } catch (error) {

      console.log(error.response.data.message)
      
     }




    }

    

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>

                <NavLink to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} 
                icon={HiUser}
                label={currentUser.isAdmin ? "Admin" : "User"}
                labelColor='dark'
                as='div'> 
                    Profile
                </Sidebar.Item>
                </NavLink>

                {
              currentUser.isAdmin && 
              <NavLink
              to='/dashboard?tab=dash'>
                <Sidebar.Item active={tab==='dash'}
                icon={HiChartPie}
                labelColor='dark'
                as='div'>
                  DashBoard  
              </Sidebar.Item>
              </NavLink>
           }

              { currentUser.isAdmin &&
            <NavLink to='/dashboard?tab=posts'>
            <Sidebar.Item active={tab === 'posts'} 
            icon={HiDocumentText}
            labelColor='dark'
            as='div'> 
                Posts
            </Sidebar.Item>
           </NavLink>}

           { currentUser.isAdmin &&
            <NavLink to='/dashboard?tab=users'>
            <Sidebar.Item active={tab === 'users'} 
            icon={HiOutlineUserGroup}
            labelColor='dark'
            as='div'> 
                Users
            </Sidebar.Item>
           </NavLink>}

           {
              currentUser.isAdmin && 
              <NavLink
              to='/dashboard?tab=comments'>
                <Sidebar.Item active={tab==='comments'}
                icon={HiAnnotation}
                labelColor='dark'
                as='div'>
                  Comments
                </Sidebar.Item>
              </NavLink>
           }


                <Sidebar.Item 
                icon={HiArrowSmRight}
                className='cursor-pointer'
                onClick={handleSignOut} > 
                    Sign Out
                </Sidebar.Item>

               

            </Sidebar.ItemGroup>





        </Sidebar.Items>

    </Sidebar>
  )
}

export default DashSidebar
