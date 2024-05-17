"use client"

import React from 'react'
import { Inter } from "next/font/google";
import { selectCartError } from '@/lib/store/slices/cart.reducer';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { selectCartDetails, clearCart } from '@/lib/store/slices/cart.reducer';




const inter = Inter({ subsets: ["latin"] });

const PaymentOverlay = () => {
  const router = useRouter()



  const cartError = useAppSelector(selectCartError)
  const {product, amount, image} = useAppSelector(selectCartDetails)
  const dispatch = useAppDispatch()

  const discardCart = () => {
    dispatch(clearCart())
  }

  const navigate = (url) => {
    dispatch(clearCart())
    router.push(url)
  }
  return (
    <div className={`payment-overlay ${inter.className} `} >
        { !cartError? <div className= {`mobile-card ${inter.className} `} >
              <div className='img' style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }} ></div>
              <h3 className='product' >{product}</h3>
              <p className='price' >you are about to make a NGN{amount} purchase</p>
              <button>Checkout</button>
              <p className='disclaim' >Secured payments with paystack</p>
              <div className='close' onClick = {discardCart} >+</div>
            </div> : 
            <div className={`${inter.className} mobile-card error`} >
              <h3>{cartError}</h3>
              <button onClick={() => navigate('login')} >Sign In</button>
              <div className='close' onClick = {discardCart} >+</div>
            </div>
        }
    </div>
  )
}

export default PaymentOverlay