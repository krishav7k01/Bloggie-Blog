import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

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
    <div>
      
    </div>
  )
}

export default DashBoardComp
