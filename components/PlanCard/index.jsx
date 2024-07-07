"use client"

import React from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setCartDetails, setCartError } from '@/lib/store/slices/cart.reducer';
import { selectCurrentUser } from '@/lib/store/slices/user.reducer';



const PlanCard = ({plan, color, title}) => {
    
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
    <div style={{backgroundColor: color}} className="plans-card">
        <h2 style={{fontSize:"33px"}} >Subscribe to <em >{plan.tier.toLowerCase()}</em> for access to <b>{title.toLowerCase()} </b> and many other poems </h2>
        <p>{plan.description}</p>
        <div className="card-cta">
        <a onClick={() => {
            setNewCart(plan.price, plan.label, plan.imageUrl, plan.tier);
        }}>Subscribe</a>
        <p>${plan.price} per month</p>
        </div>
    </div>
)
}

export default PlanCard