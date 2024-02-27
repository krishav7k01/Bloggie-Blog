import { Avatar, Button, Dropdown, Navbar , TextInput} from 'flowbite-react'
import React from 'react'
import { NavLink, useLocation, useNavigate} from 'react-router-dom'
import {AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';



const Header = () => {

    const navigate = useNavigate()

    const handleLogout = async(e) =>{

        try{
  
          const res = await fetch(`/v1/api/user/logout/${currentUser._id}`,
          {
            method : 'POST'
          })
  
          const data =  await res.json()
  
          if(data.success === true)
          {
            dispatch(signoutSuccess(null))
            navigate("/")
          }
  
        }
        catch(error){
          console.log(error)
        }
         
  
      }
    

    const{currentUser}= useSelector(state => state.user)
    const{theme} = useSelector(state => state.theme)

    const path = useLocation().pathname;
    const dispatch = useDispatch()
    
    
  return (
    <Navbar className='border-b-2'>
        <NavLink to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white " >
            <span className='px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>BLoggie</span>
        </NavLink>
        <form>
            <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            
            />

</form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill> 
                <AiOutlineSearch className='h-5'/>
            </Button>   
    

<div className='flex gap-2 md:order-2'>
    <Button className='w-12 h-10 sm-inline' color='gray' pill onClick={()=> dispatch(toggleTheme())}>
        {
            theme === 'light' ? 
            <FaSun/> :
            <FaMoon/>

        }
    </Button>

   { currentUser ? (

    <Dropdown arrowIcon={false}
    inline
    label={
        <Avatar
        alt='user'
        img={currentUser.profilePhoto}
        rounded/>
   }>
    <Dropdown.Header>
        <span className='block text-sm'>@{currentUser.userName}</span>
        <span className='block text-sm font-medium truncate' >@{currentUser.email}</span>
    </Dropdown.Header>

    <NavLink to={'/dashboard?tab=profile'}>
        <Dropdown.Item>Profile</Dropdown.Item>
    </NavLink>
    <Dropdown.Divider/>
    
        <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
   
        
    </Dropdown>

   ) :
   
   (<NavLink to='/sign-in'>
        <Button gradientDuoTone='purpleToBlue' outline> Sign In</Button>
    </NavLink>
    )
    }

<Navbar.Toggle/>
   </div>
   
   <Navbar.Collapse>
        <Navbar.Link active={path ==="/"} as={'div'}>
            <NavLink to='/'>Home</NavLink>
        </Navbar.Link>
        <Navbar.Link active={path ==="/about"} as={'div'}>
            <NavLink to='/about'>About</NavLink>
        </Navbar.Link>
        <Navbar.Link active={path ==="/projects" } as={'div'}>
            <NavLink to='/projects'>Projects</NavLink> 
        </Navbar.Link>
    </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
