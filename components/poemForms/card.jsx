import Link from 'next/link'
import React from 'react'

const PoemFormsCard = ({bg, name, url, poemsLength}) => {
  return (
    <div className='poem-form-card' style={{ background: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }} >
        <div className='form-info' >
            <h5>{name}</h5>
            <p>{poemsLength} poems</p>
        </div>
        <a href={url} >
            <div className='arrow' id='arrow' >
                <img src="/arrow-ur.svg" alt="" />
            </div>
        </a>
    </div>
  )
}

export default PoemFormsCard