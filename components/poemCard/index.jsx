import React from 'react'
import PlanTag from './planTag'

const PoemCard = ({poem, color, download}) => {
  const {title, subscriptionPlan, poemFile} = poem

  return (
    <div className='poem-card' style={{ borderColor: color? color: '' }} >
      <PlanTag plan={subscriptionPlan} />
      <p style={{ color: color? color: '' }} >{title}</p>
      { !download? <button style={{ borderColor: color? color : '',  color: color? color: ''  }} >Get poem</button> : 
      <a href={poemFile.url} target='_blank' style={{ borderColor: color? color : '',  color: color? color: ''  }} >Download</a>}
    </div>
  )
}

export default PoemCard