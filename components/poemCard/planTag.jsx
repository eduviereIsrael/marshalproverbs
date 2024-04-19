import React from 'react'

const PlanTag = ({plan}) => {

    const getBg = (tagPlan) => {
        switch(tagPlan.toLowerCase()){
            case 'gold':
                return '#4F6C70'
            case 'platinum' :
                return '#AF9070'
            default:
                return '#D064D2'
        }
    }

  return (
    <div className='tag' style={{backgroundColor: getBg(plan), width: "max-content", fontSize: '11px', fontWeight: '400', padding: '2px 11px', borderRadius: '30px'}} >{plan}</div>
  )
}

export default PlanTag