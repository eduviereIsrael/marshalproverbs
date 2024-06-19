"use client"

import React from 'react'
import PlanTag from './planTag'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setCartDetails, setCartError } from '@/lib/store/slices/cart.reducer';
import { selectCurrentUser } from '@/lib/store/slices/user.reducer';

const PoemCard = ({poem, color, download}) => {
  const {title, subscriptionPlan, poemFile} = poem;

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser)


  const plans = {
    gold: [499, 'GOLD subscription', '/gold.png', 'GOLD'],
    platinum: [999, 'PLATINUM subscription', '/platinum.png', 'PLATINUM'],
    supernova: [1499, 'SUPERNOVA subscription', '/supernova.png', 'SUPERNOVA']
  }

  const handlePoemSubscription = (plan) => {
    const email = currentUser?.email;

    if(!email){
        dispatch(setCartError({error: 'You must be logged in to make this purchase', link: "login"}))
        return

    }
    
    if (plan.toLowerCase() === 'exclusive'){
      console.log("It's exclusive")

      return
    }

  }

  return (
    <div className='poem-card' style={{ borderColor: color? color : '' }} >
      <PlanTag plan={subscriptionPlan} />
      <p style={{ color: color? color: '' }} >{title}</p>
      { !download? <button style={{ borderColor: color? color : '',  color: color? color: ''  }} onClick={() => console.log(plans[subscriptionPlan.toLowerCase()])} >Get poem</button> : 
      <a href={poemFile.url} target='_blank' style={{ borderColor: color? color : '',  color: color? color: ''  }} >Download</a>}
    </div>
  )
}

export default PoemCard