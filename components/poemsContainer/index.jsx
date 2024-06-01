import React from 'react'
import PoemCard from '../poemCard'

const PoemsContainer = ({poems, color, download}) => {
  return (
    <div className="poem-container">
            {
                poems.map((poem, i) => (
                    <PoemCard key={i} poem={poem} color={color} download = {download} />
                ))
            }
            </div>
  )
}

export default PoemsContainer