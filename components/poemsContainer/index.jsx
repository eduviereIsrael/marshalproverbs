import React from 'react'
import PoemCard from '../poemCard'

const PoemsContainer = ({poems, color}) => {
  return (
    <div className="poem-container">
            {
                poems.map((poem, i) => (
                    <PoemCard key={i} poem={poem} color={color} />
                ))
            }
            </div>
  )
}

export default PoemsContainer