'use client'
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCartDetails } from "@/lib/store/slices/cart.reducer";
import { selectCurrentUser } from "@/lib/store/slices/user.reducer";
import { setCartError } from "@/lib/store/slices/cart.reducer";
import { allHaikuSelector, setHaiku } from "@/lib/store/slices/haiku.reducer"

import React,{useRef, useEffect, useState} from 'react'

const TopHaiku = ({haikuWallpapers}) => {

    
    const [constStyle, setContStyle] = useState(0)
    const divRef = useRef()
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(selectCurrentUser)
    const haikuListed = useAppSelector(allHaikuSelector)



    const scroll = (x) => {

        // if(divRef.current.scrollWidth > constStyle + x){

        //     setContStyle(prev => prev + x)
        // }

        // console.dir(divRef.current)
        divRef.current.scrollLeft += x

    }

    // useEffect(() => {
    //     console.log(haikuWallpapers)
    //     dispatch(setHaiku(haikuWallpapers))
    // }, [dispatch])


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

    //prevent users from being able to download images without buying them
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

    const replaceUnderscore = (str) => str.replace(/_/g, ' ')

    const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 10; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString;
    };


    const setNewCart = (price, product, image, id) => {
        const paymentID = generateRandomString();
        const email = currentUser?.email;
        const purchasedWallpapers = currentUser? [...currentUser?.purchases.haikuWallpapers] : []
        const category = 'haikuWallpapers'

        if(!email){
            dispatch(setCartError({error: 'You must be logged in to make this purchase', link: "login"}))

            return

        }

        if(purchasedWallpapers.includes(id)){
            dispatch(setCartError({error: 'You already own this wallpaper', link: "dashboard"}))
            return
        }





        dispatch(setCartDetails({
            paymentID,
            email,
            product,
            amount: price,
            image,
            category,
            productId: id
        }))

        
    }


   


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
                { haikuListed?.map(poem => (
                    <div className='haiku-card' key={poem.id} >
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
                            <p className='price' >${addComma((poem.wallpapers.length * 5).toString())}</p>
                            <button onClick={() => setNewCart(poem.wallpapers.length * 5, `${poem.theme} theme haiku wallpapers `, poem.wallpapers[0].url, poem.id)} >Buy Now</button>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    </div>
  )
}

export default TopHaiku