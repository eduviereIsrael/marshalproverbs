"use client"

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCurrentUser, signOut } from '@/lib/store/slices/user.reducer';
import { signInAtFirstRender } from '@/lib/store/slices/user.reducer'; 
import { PaymentOverlay } from '..';
import { selectPaymentOverlay } from '@/lib/store/slices/cart.reducer';


const Navbar = () => {

  const [navClick, setNavClick] = useState(false)

  const router = useRouter()

  const navigate = (url) => router.push(url)
  const currentUser = useAppSelector(selectCurrentUser)
  const paymentOverlay = useAppSelector(selectPaymentOverlay)

  const dispatch = useAppDispatch()

  const signOutHandler = () => dispatch(signOut())

  useEffect(() => {
    dispatch(signInAtFirstRender())
  }, [])

  return (
    < div className= 'NavbarDiv'>
      <  div className='NavbarContainer' >
        <img src='/logo.svg' alt='logo' className='logo' />

        <div className="menuitems">
          <span onClick={() => navigate('/')} >Home</span>
          <span onClick={() => navigate('/poems')} >Poems</span>
          <span onClick={() => navigate('/haiku-wallpapers')} >Wallpapers</span>
          
        </div>

        {
            !currentUser? <div className="nav-buttons">
            <Link href={'/login'} >
              <span className='login' >LOGIN</span>
            </Link>

            <Link href={'/signup'} >
              <span className='sign-up' >SIGN UP</span>
            </Link>
            </div> : <h3 onClick={signOutHandler} >Logged in</h3>
        }
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
            <a href='/poems'>Poems</a>
            <a href='/haiku-wallpapers'>Wallpapers</a>
            {
            !currentUser? <div className="nav-buttons"  >
            <Link href={'/login'} >
              <span className='login' onClick={() => setNavClick(false)} >LOGIN</span>
            </Link>

            <Link href={'/signup'} >
              <span className='sign-up' onClick={() => setNavClick(false)} >SIGN UP</span>
            </Link>
            </div> : <h3 onClick={signOutHandler} >Logged in</h3>
        }
          </div>
      </div>
      </  div >
      { paymentOverlay && <PaymentOverlay />}
    </ div  >
  )
}

export default Navbar