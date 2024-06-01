import React from 'react'
import PoemFormsCard from './card'

const PoemsForm = () => {


    const poemForms = [
        {
          "name": "Lipogram",
          "url": "lipogram",
          "image": "cinquain.webp",
          "length": 4
        },
        {
          "name": "Free Verse",
          "url": "free_verse",
          "image": "tanka.webp",
          "length": 8
        },
        {
          "name": "Mashal",
          "url": "mashal",
          "image": "mashal.webp",
          "length": 2
        }
      ]

  return (
    <div className='poem-forms' >
        <div className="container">
        <h2>
        Find a form that resonates with you.
        </h2>
        <div className="cont">
            {
                poemForms.map(({name, url, image, length}) => (
                    <PoemFormsCard key={name} bg={image} name={name} url={url} poemsLength = {length} />
                ))
            }
        </div>
        </div>
    </div>
  )
}

export default PoemsForm