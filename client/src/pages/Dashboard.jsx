import React, { useEffect, useState } from 'react'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import { useLocation } from 'react-router-dom'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'

const Dashboard = () => {

  const location = useLocation();
  const[tab, setTab] = useState('');

  useEffect(()=>{

    const urlParams = new URLSearchParams(location.search) //this will give us value from parmas after /dasboard
    const tabFromUrl = urlParams.get('tab');  //this will return ?tab=xx which ever value is there after =
    //? here act as seprator which means URl resource path has end
    if(tabFromUrl)
    {
      setTab(tabFromUrl)
    }
  },[location.search])


  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        <DashSidebar/>
      </div>
     { tab=='profile' && <DashProfile/>}
     { tab=='posts' && <DashPosts/>}
     {tab =='users' && <DashUsers/>}
    </div>
  )
}

export default Dashboard
