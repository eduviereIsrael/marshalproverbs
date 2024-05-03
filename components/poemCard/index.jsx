import React from 'react'
import PlanTag from './planTag'

const PoemCard = ({poem, color}) => {
  const {title, subscriptionPlan} = poem

  return (
    <div className='poem-card' style={{ borderColor: color? color: '' }} >
      <PlanTag plan={subscriptionPlan} />
      <p style={{ color: color? color: '' }} >{title}</p>
      <button style={{ borderColor: color? color : '',  color: color? color: ''  }} >Get poem</button>
    </div>
  )
}

export default PoemCard