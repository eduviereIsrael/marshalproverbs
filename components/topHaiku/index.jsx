'use client'

import React,{useRef, useEffect, useState} from 'react'

const TopHaiku = ({haikuWallpapers}) => {

    
    const [constStyle, setContStyle] = useState(0)
    const divRef = useRef()
    const scroll = (x) => {

        // if(divRef.current.scrollWidth > constStyle + x){

        //     setContStyle(prev => prev + x)
        // }

        // console.dir(divRef.current)
        divRef.current.scrollLeft += x

    }


    useEffect(() => {
        console.dir(divRef.current.scrollWidth)
    }, [])

    const addComma = (string) => {
        // Check if the string has at least 3 characters
        if (string.length < 3) {
          return string; // If the string is too short, return it as is
        }
      
        // Insert a comma before the third character from the end
        const index = string.length - 3; // Index of the third character from the end
        const stringWithComma = string.slice(0, index) + ',' + string.slice(index);
      
        return stringWithComma;
      }

      useEffect(() => {
        const handleContextMenu = (event) => {
          event.preventDefault(); // Prevent the default behavior of the context menu
          // Add your custom logic here
          // For example, redirecting the user to a different page:
        };
    
        // Add event listener for the contextmenu event when the component mounts
        document.addEventListener('contextmenu', handleContextMenu);
    
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
          document.removeEventListener('contextmenu', handleContextMenu);
        };
      }, []); 


   


  return (
    <div className='haiku-top-div' >

        <div className="container">
            <div className="header">
            <h2>Top Rated <br/> hiaku wallpapers</h2>

            <div className="carousel-control">
                <div onClick={() => scroll(314)} >
                    <img src='/arrow-left.svg' />
                </div>
                <div onClick={() => scroll(-314)} >
                    <img src='/arrow-right.svg' />
                </div>
            </div>
            </div>
            <div className="haiku-cont" ref={divRef}  >
                { haikuWallpapers.map(poem => (
                    <div className='haiku-card' key={poem.theme} >
                        <div className="border">

                        <div className="heading">

                         {poem.theme}
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
        </div>
    </div>
  )
}

export default TopHaiku