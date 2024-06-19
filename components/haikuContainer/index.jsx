'use client'
import { setHaiku } from "@/lib/store/slices/haiku.reducer";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCartDetails } from "@/lib/store/slices/cart.reducer";
import { selectCurrentUser } from "@/lib/store/slices/user.reducer";
import { setCartError } from "@/lib/store/slices/cart.reducer";

import React,{useRef, useEffect, useState} from 'react'

const HaikuContainer = ({haikuWallpapers}) => {


    const [constStyle, setContStyle] = useState(0)
    const divRef = useRef()
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(selectCurrentUser)

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
        const purchasedWallpapers = [...currentUser?.purchases.haikuWallpapers]
        const category = 'haikuWallpapers'
        // console.log(purchasedWallpapers, id)

        if(!email){
            dispatch(setCartError({error: 'You must be logged in to make this purchase', link: "login"}))

            return

        }

        if(purchasedWallpapers.includes(id)){
            // console.log(purchasedWallpapers, id)
            // console.log(purchasedWallpapers, id)
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
                <p className='price' >${addComma((poem.wallpapers.length * 5).toString())}</p>
                {/* <button>Buy Now</button> */}
                <button onClick={() => setNewCart((poem.wallpapers.length * 5), `${poem.theme} theme haiku wallpapers `, poem.wallpapers[0].url, poem.id)} >Buy Now</button>

            </div>
                </div>
        )) }
    </div>
  )
}

export default HaikuContainer