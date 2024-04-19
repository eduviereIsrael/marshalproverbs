"use client"

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"

const Navbar = () => {

  const [navClick, setNavClick] = useState(false)

  const router = useRouter()

  const navigate = (url) => router.push(url)

  return (
    < div className= 'NavbarDiv'>
      <  div className='NavbarContainer' >
        <img src='/logo.svg' alt='logo' className='logo' />

        <div className="menuitems">
          <span onClick={() => navigate('/')} >Home</span>
          <span onClick={() => navigate('/')} >Poems</span>
          <span onClick={() => navigate('/')} >Wallpapers</span>
          
        </div>

        <div className="nav-buttons">
          <Link href={'/'} >
            <span className='login' >LOGIN</span>
          </Link>

          <Link href={'/'} >
            <span className='sign-up' >SIGN UP</span>
          </Link>
        </div>
      </ div >
      <  div className='MobileContainer'>
      <img src='/logo.svg' alt='logo' className='logo' />
      <div className={navClick? 'hambuga spin': 'hambuga'} onClick={() => {setNavClick(!navClick)}}>
          <div className='ham dis'></div>
          <div className='ham spins'></div>
          <div className='ham spins-i'></div>
          <div className='ham dis'></div>
      </div>
      <div className={navClick? "mob-menu-div menu-show": "mob-menu-div "}>
          <div className="mob-menu-div-cont">
              <a href='/'>Home</a>
              <a href=''>About Us</a>
              <a href=''>Study Abroad counselling</a>
              <a href='/foreign-exams'>Foreign Exams</a>
              <a href=''>Contact Us</a>
              
          </div>
      </div>
      </  div >
    </ div  >
  )
}

export default Navbar