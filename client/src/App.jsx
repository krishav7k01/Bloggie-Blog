import {React} from 'react'
import Home from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom';
import About from './pages/About.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Project from './pages/Project.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import CreatePost from './pages/CreatePost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import PostPage from './pages/PostPage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Search from './pages/Search.jsx';


function App() {
 
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/sign-in" element={<Signin />}/>
      <Route path="/sign-up" element={<Signup />}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<Dashboard />}/>
      </Route>
      <Route element={<AdminPrivateRoute/>}>
      <Route path="/create-post" element={<CreatePost />}/>
      <Route path="/update-post/:postId" element={<UpdatePost />}/>
      </Route>
      <Route path="/projects" element={<Project/>}/>
      <Route path="/post/:postSlug" element={<PostPage/>}/>
      <Route path="/search" element={<Search />}/>
    </Routes>
    <Footer/>
  </>
  )

}

export default App
