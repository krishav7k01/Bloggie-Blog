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
      <Route path="/projects" element={<Project/>}/>
    </Routes>
    <Footer/>
  </>
  )

}

export default App
