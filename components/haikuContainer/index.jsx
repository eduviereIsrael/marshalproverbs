'use client'

import React from 'react'

const HaikuContainer = ({haikuWallpapers}) => {

    const replaceUnderscore = (str) => str.replace(/_/g, ' ')

    const addComma = (string) => {
        // Check if the string has at least 3 characters
        if (string.length < 3) {
          return string; // If the string is too short, return it as is
        }
      
        const index = string.length - 3
        const stringWithComma = string.slice(0, index) + ',' + string.slice(index);
      
        return stringWithComma;
      }
      
  return (
    <div className="haiku-cont"   >
        { haikuWallpapers.map(poem => (
            <div className='haiku-card' key={poem.theme} >
                <div className="border">

                <div className="heading">

                    {replaceUnderscore(poem.theme)}
                </div>
                <div className="inner">
                    
                    <div className="big-img">
                        <img src={poem.wallpapers[0].url} alt="" />
                    </div>
                    <div className="sml-img">
                        <div className="img">

                        <img src={poem.wallpapers[1].url} alt="" />
                        </div>

                        <div className="img-left">
                            {poem.wallpapers.length - 2} more
                        </div>
                    </div>
                </div>
                <p className='price' >N{addComma(poem.price.toString())}</p>
                <button>Buy Now</button>
            </div>
                </div>
        )) }
    </div>
  )
}

export default HaikuContainer