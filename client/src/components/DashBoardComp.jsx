import axios from 'axios';
import { Button, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const DashBoardComp = () => {

    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const {currentUser} = useSelector((state) => state.user)


useEffect(()=>{

    try {
        const fetchUsers = async () =>{

            const res = await axios.get('/v1/api/user/getusers?limit=5')
            const data= await res.data

            if(data.success === true)
            {
                setUsers(data.data.userWithoutPassword)
                setTotalUsers(data.data.totalUsers)
                setLastMonthUsers(data.data.oneMonthAgoUsers)
            }
    
        }
    
        const fetchComments = async () =>{

            const res = await axios.get('/v1/api/comment/getallcomments?limit=5')
            const data= await res.data

            if(data.success === true)
            {
                setComments(data.data.allComments)
                setTotalComments(data.data.countComments)
                setLastMonthComments(data.data.lastMonthComments)
            }
            
        }
    
        const FetchPosts = async () =>{

            const res = await axios.get('/v1/api/post/getposts?limit=5')
            const data= await res.data

            if(data.success === true)
            {
                setPosts(data.data.data)
                setTotalPosts(data.data.totalPosts)
                setLastMonthPosts(data.data.lastMonthsPosts)
            }

            
            
        }
    
        fetchUsers()
        fetchComments()
        FetchPosts()

    } catch (error) {

        console.log(error.response.data.message)
        
    }

},[currentUser])


  return (
    <div className='p-4 md:mx-auto'>

        <div className=" flex flex-wrap gap-5 justify-center">
            <div className=" flex flex-col p-3 gap-4 md:w-80 w-full dark:bg-slate-800 rounded-md shadow-md">
                <div className=" flex justify-between items-center">
                    <div className="">

                    <h3 className=' text-md text-gray-500 uppercase'>Total Users</h3>
                    <p className=' text-2xl'>{totalUsers}</p>
                    </div>
                   
                    <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
                </div>
                <div className=" flex gap-2 text-sm">
                    <span className=' text-green-500 flex items-center'> 
                        <HiArrowNarrowUp/>
                        {lastMonthUsers}
                    </span>
                    <div className=" text-gray-500">Last Month</div>
                </div>
                
                
            </div>

            <div className=" flex flex-col p-3 gap-4  md:w-80 w-full dark:bg-slate-800 rounded-md shadow-md">
                <div className=" flex justify-between items-center">
                    <div className="">

                    <h3 className=' text-md text-gray-500 uppercase'>Total Posts</h3>
                    <p className=' text-2xl'>{totalPosts}</p>
                    </div>
                   
                    <HiDocumentText className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
                </div>
                <div className=" flex gap-2 text-sm">
                    <span className=' text-green-500 flex items-center'> 
                        <HiArrowNarrowUp/>
                        {lastMonthPosts}
                    </span>
                    <div className=" text-gray-500">Last Month</div>
                </div>
                
                
            </div>

            <div className=" flex flex-col p-3 gap-4 md:w-80 w-full dark:bg-slate-800 rounded-md shadow-md">
                <div className=" flex justify-between items-center">
                    <div className="">

                    <h3 className=' text-md text-gray-500 uppercase'>Total Comments</h3>
                    <p className=' text-2xl'>{totalComments}</p>
                    </div>
                   
                    <HiDocumentText className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
                </div>
                <div className=" flex gap-2 text-sm">
                    <span className=' text-green-500 flex items-center'> 
                        <HiArrowNarrowUp/>
                        {lastMonthComments}
                    </span>
                    <div className=" text-gray-500">Last Month</div>
                </div>
                
                
            </div>
        </div>

        <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className=" flex justify-between p-3 text-sm font-semibold">
                    <h1 className=' text-center p-2'>Recent Users</h1>
                    <Button outline gradientDuoTone='purpleToPink'>
                        <NavLink to={'/dashboard?tab=users'}>
                            See all
                        </NavLink>
                    </Button>
                </div>
                <Table hoverable>
                <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head> 
                
                {users &&
              users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={user.profilePhoto}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.userName}</Table.Cell>
                  </Table.Row>
                </Table.Body>
                
              ))}
              </Table>
            </div>

            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className=" flex justify-between p-3 text-sm font-semibold">
                    <h1 className=' text-center p-2'>Recent Posts</h1>
                    <Button outline gradientDuoTone='purpleToPink'>
                        <NavLink to={'/dashboard?tab=posts'}>
                            See all
                        </NavLink>
                    </Button>
                </div>
                <Table hoverable>
                <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
            </Table.Head> 
                
                {users &&
              posts.map((post) => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={post.postPhoto}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell>{post.title}</Table.Cell>
                  </Table.Row>
                </Table.Body>
                
              ))}
              </Table>
            </div>

            <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className=" flex justify-between p-3 text-sm font-semibold">
                    <h1 className=' text-center p-2'>Recent Comments</h1>
                    <Button outline gradientDuoTone='purpleToPink'>
                        <NavLink to={'/dashboard?tab=comments'}>
                            See all
                        </NavLink>
                    </Button>
                </div>
                <Table hoverable>
                <Table.Head>
              <Table.HeadCell>Comment</Table.HeadCell>
              <Table.HeadCell>No of Likes</Table.HeadCell>
            </Table.Head> 
                
                {users &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      
                        {comment.comment}
                       
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
                
              ))}
              </Table>
            </div>

        </div>


    </div>

    


  )
}

export default DashBoardComp
