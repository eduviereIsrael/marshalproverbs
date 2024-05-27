
"use client"
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { selectCartDetails, verifypayments, selectPaymentStatus, selectverifyIsLoading } from '@/lib/store/slices/cart.reducer'
import {selectCurrentUser, updateUserPurchase } from '@/lib/store/slices/user.reducer'
import { useSearchParams } from 'next/navigation' 


const ConfirmPayment = () => {
  const query = useSearchParams()
  const dispatch = useAppDispatch()
  const reference = query?.get('reference')

  const payemntStatus = useAppSelector(selectPaymentStatus)
  const verifyIsLoading = useAppSelector(selectverifyIsLoading)
  const {category, productId} = useAppSelector(selectCartDetails)
  const currentUser = useAppSelector(selectCurrentUser)

  const id = currentUser?.id

  useEffect(() => {
    if(reference){
      dispatch(verifypayments(reference))
    }
  }, [])

  useEffect(() => {
    if(payemntStatus === "completed"){
      if(id && category && productId){
        dispatch(updateUserPurchase({userId: id, category, productId}))
      } else {
        console.log("something is wrong")
      }
    }
  }, [payemntStatus, category, dispatch, productId, id])
  return (
    <div className='confirm-payment' >
        <div className="container">
            { payemntStatus === "completed" && !verifyIsLoading?  <div className="successful">
              <h1>Payment Successful</h1>
              <p>Your purchase has been processed successfully</p>
            </div> : ''}
            { payemntStatus === "failed" && <div className="failed">
              <h1>Payment Failed</h1>
              <p>Your payment has failed</p>
            </div> }
            { verifyIsLoading && <div className="pending">
              <h2>Kindly Hold on as we process your payments</h2>
                <span className="spinner dark"></span>
              </div>}
            { !reference && <div>
                <h1>No payments detected</h1>
                <p>There is currently no payment being made</p>
            </div> }
        </div>
    </div>
  )
}

export default ConfirmPayment