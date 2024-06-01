"use client";

import React from 'react'
import PoemCard from '../poemCard'
import { useSelector } from 'react-redux'
import { useAppSelector } from '@/lib/store/hooks';
import { selectAllPoemsReducer } from '@/lib/store/slices/poems.reducer'

const PoemsListed = ({poemsIndex}) => {

    // const poems = [
    //     // { title: 'Melody of the Soul', subscriptionPlan: 'Gold' }
    //     { title: 'Melody of the Soul', subscriptionPlan: 'Gold' },
    //     { title: 'Echoes of Tomorrow', subscriptionPlan: 'Platinum' },
    //     { title: 'Dance with Destiny', subscriptionPlan: 'Gold' },
    //     { title: 'Whispers in the Night', subscriptionPlan: 'Supernova' },
    //     { title: 'Melody of the Soul', subscriptionPlan: 'Gold' },
    //     { title: 'Echoes of Tomorrow', subscriptionPlan: 'Platinum' },
    //     { title: 'Dance with Destiny', subscriptionPlan: 'Gold' },
    //     { title: 'Whispers in the Night', subscriptionPlan: 'Supernova' },
    //     { title: 'Melody of the Soul', subscriptionPlan: 'Gold' },
    //     { title: 'Echoes of Tomorrow', subscriptionPlan: 'Platinum' },
    //     { title: 'Dance with Destiny', subscriptionPlan: 'Gold' },
    //     { title: 'Whispers in the Night', subscriptionPlan: 'Supernova' },
    // ]

    const poems = useAppSelector(selectAllPoemsReducer)

  return (
    <div className='poems-listed' >
        <div className="container">
            <h2>
            poems, doorways to the worlds deepest mysteries
            </h2>

            <div className="poem-container">
            {
                poems?.map((poem, i) => (
                    <PoemCard key={i} poem={poem} />
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default PoemsListed