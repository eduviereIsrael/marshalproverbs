"use client";


import React from 'react'
import PoemCard from '../poemCard';
import { useAppSelector } from '@/lib/store/hooks';



const WeeklyPoems = () => {

  // const poems = [
  //   { title: 'Melody of the Soul', subscriptionPlan: 'Gold' },
  //   { title: 'Echoes of Tomorrow', subscriptionPlan: 'Platinum' },
  //   { title: 'Dance with Destiny', subscriptionPlan: 'Gold' },
  //   { title: 'Whispers in the Night', subscriptionPlan: 'Supernova' },
  //   // { title: 'Melody of the Soul', subscriptionPlan: 'Gold' }
  // ]

  const poems = useAppSelector((state) => state.poems.weeklyPoems)
  
  return (
    <div className='weekly-poems' >
      <div className="weekly-p-cont">

      <div className='heading' >
        <h2>Poems of the week</h2>
      </div>

      <div className="poem-container">
        {
          poems.map((poem) => (
            <PoemCard key={poem.title} poem={poem} />
          ))
        }
      </div>
      </div>
    </div>
  )
}

export default WeeklyPoems