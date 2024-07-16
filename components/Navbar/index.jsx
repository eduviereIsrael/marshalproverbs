"use client"

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCurrentUser, signOut, selectClearDate } from '@/lib/store/slices/user.reducer';
import { signInAtFirstRender, checkSub } from '@/lib/store/slices/user.reducer'; 
import { PaymentOverlay } from '..';
import { selectPaymentOverlay } from '@/lib/store/slices/cart.reducer';
import { setAllPoems, selectAllPoemsReducer } from "@/lib/store/slices/poems.reducer"
import { allHaikuSelector, setHaiku } from "@/lib/store/slices/haiku.reducer"


const Navbar = ({data}) => {

  const [navClick, setNavClick] = useState(false)
  const [userNavClick, setUserNavClick] = useState(false)

  const router = useRouter()

  const navigate = (url) => router.push(url)
  const currentUser = useAppSelector(selectCurrentUser)
  const clearDate = useAppSelector(selectClearDate)
  const paymentOverlay = useAppSelector(selectPaymentOverlay)

  const dispatch = useAppDispatch()

  const poemsListed = useAppSelector(selectAllPoemsReducer)
  const haikuListed = useAppSelector(allHaikuSelector)

  const signOutHandler = () => dispatch(signOut())

  useEffect(() => {
      dispatch(setAllPoems(data.poems))
  }, [data.poems, dispatch, poemsListed.length])

  useEffect(() => {
      dispatch(setHaiku(data.haikuWallpapers))
  }, [dispatch, data.haikuWallpapers])

  useEffect(() => {
    const isDatePastOrFuture = (dateString) => {
      if(!dateString){
        return "past"
      }
      const inputDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ignore the time part for accurate comparison
      if (inputDate < today) {
        return 'past';
        
      } else if (inputDate > today) {
        return 'future';
      } else {
        return 'today';
      }
    };


    if(isDatePastOrFuture(clearDate) == "past"){
      dispatch(signInAtFirstRender())
    } else {
      if(currentUser){
        dispatch(checkSub({userId: currentUser.id, id: currentUser?.sub?.id}))
      }
    }
  }, [currentUser, dispatch])

 

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
            </div> : <div className='user-menu' >
              <div className="user-tag" onClick={() => setUserNavClick((prev) => !prev)} >
                <div className="user-icon">{currentUser?.fullName[0].toUpperCase()}</div>
              </div>

             { userNavClick &&  <div className="user-links" onClick={() => setUserNavClick(false)} >
                <Link href={'/dashboard'} style={{padding: '0', margin: '12px 0 15px'}} >
                  <span>Dashboard</span>
                </Link>
                <span onClick={signOutHandler} >Logout</span>
              </div>}
            </div>
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
            </div> : < >
            <a href='/dashboard'>Dashboard</a>
            <a href='' onClick={signOutHandler} >Logout</a>

            </>
        }
          </div>
      </div>
      </  div >
      { paymentOverlay && <PaymentOverlay />}
    </ div  >
  )
}

export default Navbar