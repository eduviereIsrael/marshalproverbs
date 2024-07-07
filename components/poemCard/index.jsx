"use client"

import React from 'react'
import PlanTag from './planTag'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setCartDetails, setCartError } from '@/lib/store/slices/cart.reducer';
import { selectCurrentUser } from '@/lib/store/slices/user.reducer';
import { useRouter } from 'next/navigation';
const PoemCard = ({poem, color, download}) => {
  const {title, subscriptionPlan, poemFile} = poem;

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser)
  const router = useRouter()


  const plans = {
    gold: [499, 'GOLD subscription', '/gold.png', 'GOLD'],
    platinum: [999, 'PLATINUM subscription', '/platinum.png', 'PLATINUM'],
    supernova: [1499, 'SUPERNOVA subscription', '/supernova.png', 'SUPERNOVA']
  }

  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
  };

  const handlePoemSubscription = (plan) => {
    const email = currentUser?.email;
    const sub = currentUser?.sub?.plan
    const category = 'sub'
    const paymentID = generateRandomString();
    
    if (plan.toLowerCase() === 'exclusive'){
      dispatch(setCartError({ error: "Contact us for enquiries on Exclusive poems", link: "contact"}))

      return
    }

    if(!email){
        dispatch(setCartError({error: 'You must be logged in to make this purchase', link: "login"}))
        return

    }

      dispatch(setCartDetails({
        paymentID,
        email,
        product:plans[plan][1],
        amount: plans[plan][0],
        image:plans[plan][2],
        category,
        productId: plans[plan][3],
    }))

  }

  const stringToSlug = str => str.toLowerCase().replace(/[\s.]+/g, '-');

  return (
    <div className='poem-card' style={{ borderColor: color? color : '' }} >
      <PlanTag plan={subscriptionPlan} />
      <p style={{ color: color? color: '' }} >{title}</p>
      { !download? <button style={{ borderColor: color? color : '',  color: color? color: ''  }} onClick={() => {
        if(subscriptionPlan.toLowerCase() === "exclusive"){
          handlePoemSubscription(subscriptionPlan)
          return
        }
        router.push(`/poems?poem=${stringToSlug(title)}`)
      }} >See more</button> : 
      <a href={poemFile.url} target='_blank' style={{ borderColor: color? color : '',  color: color? color: ''  }} >Download</a>}
    </div>
  )
}

export default PoemCard