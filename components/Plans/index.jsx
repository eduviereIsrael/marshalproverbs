"use client"

import React from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setCartDetails, setCartError } from '@/lib/store/slices/cart.reducer';
import { selectCurrentUser } from '@/lib/store/slices/user.reducer';

const Plans = () => {

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser)


  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
  };

  
  const setNewCart = (price, product, image, id) => {
    const paymentID = generateRandomString();
    const email = currentUser?.email;
    const sub = currentUser?.sub.plan
    const category = 'sub'

    if(!email){
        dispatch(setCartError({error: 'You must be logged in to make this purchase', link: "login"}))
        return

    }

    if(sub.toLowerCase() === id.toLowerCase()){
      dispatch(setCartError({error: 'You are already subscribed to this plan', link: "dashboard"}))
      return
    }



    dispatch(setCartDetails({
        paymentID,
        email,
        product,
        amount: price,
        image,
        category,
        productId: id
    }))

    
}

  return (
    <div className='plans' >
        <div className="container">

          <h2>Become a part of the community</h2>
          <div className="plans-cont">
             <div className="plans-card">
              <h2>Subscribe to GOLD and get access to over 30 poems on the platform.</h2>
              <p>Access to over 20+ poems </p>
              <div className="card-cta">
                <a onClick={() => {
                  setNewCart(499, 'GOLD subscription', '/gold.png', 'GOLD')
                }} >Subscribe</a>
                <p>$499 per month</p>
              </div>
             </div>
             <div className="plans-card">
              <h2>Subscribe to PLATINUM and get access to over 50 poems on the platform.</h2>
              <p>Access to over 30+ poems, and everything on GOLD </p>
              <div className="card-cta">
              <a onClick={() => {
                  setNewCart(999, 'PLATINUM subscription', '/platinum.png', 'PLATINUM')
                }} >Subscribe</a>
                <p>$999 per month</p>
              </div>
             </div>
             <div className="plans-card">
              <h2>Subscribe to SUPERNOVA and get access to all poems on the platform.</h2>
              <p>Access to over 30+ poems </p>
              <div className="card-cta">
              <a onClick={() => {
                  setNewCart(1499, 'SUPERNOVA subscription', '/supernova.png', 'SUPERNOVA')
                }} >Subscribe</a>
                <p>$1499 per month</p>
              </div>
             </div>
             
          </div>
        </div>
    </div>
  )
}

export default Plans