import React from 'react'
import { Footer } from 'flowbite-react'
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import { NavLink } from 'react-router-dom'

const FooterSec = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="mt-5">
                <NavLink to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white " >
            <span className='px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>BLoggie</span>
        </NavLink>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                    <Footer.Title title='About'/>
                    <Footer.LinkGroup col>
                        <Footer.Link href="#" target='_blank' rel='noopener noreferrer'>Portfolio</Footer.Link>
                        <Footer.Link href="#" target='_blank' rel='noopener noreferrer'>My Blogs</Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
              <Footer.Title title='Follow Me' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
                </div>
            </div>

            <Footer.Divider/>
            <div className="w-full flex justify-between items-center ">
            <Footer.Copyright
            href='#'
            by="Krishav Blog"
            year={new Date().getFullYear()}
            />
                <div className="flex gap-8 mt-4 sm:mt-0 items-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/sahandghavidel' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>
                </div>
            </div>
        </div>
       



    </Footer>
  )
}

export default FooterSec
