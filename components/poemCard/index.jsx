import React from 'react'
import PlanTag from './planTag'

const PoemCard = ({poem}) => {
  const {title, subscriptionPlan} = poem

  return (
    <div className='poem-card' >
      <PlanTag plan={subscriptionPlan} />
      <p>{title}</p>
      <button>Get poem</button>
    </div>
  )
}

export default PoemCard