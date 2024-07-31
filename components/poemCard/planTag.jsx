import React from 'react'

const PlanTag = ({plan, margin}) => {

    // console.log(plan)
    const getBg = (tagPlan) => {
        switch(tagPlan.toLowerCase()){
            case 'gold':
                return '#8d99ae'
            case 'platinum' :
                return '#AF9070'
            default:
                return '#656d4a'
        }
    }

  return (
      <div className='tag' style={{backgroundColor: getBg(plan), color: '#fff', width: "max-content", letterSpacing: "2px", fontSize: '11px', fontWeight: '400', padding: '4px 11px 2px', borderRadius: '30px', margin: margin? margin: "unset"}} >{plan}</div>
  )
}

export default PlanTag