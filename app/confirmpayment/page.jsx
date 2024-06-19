
"use client"
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { selectCartDetails, verifypayments, selectPaymentStatus, selectverifyIsLoading, subscribeUser } from '@/lib/store/slices/cart.reducer'
import {selectCurrentUser, updateUserPurchase } from '@/lib/store/slices/user.reducer'
import { useSearchParams } from 'next/navigation' 
import e from 'cors'


const ConfirmPayment = () => {
  const query = useSearchParams()
  const dispatch = useAppDispatch()
  const reference = query?.get('reference')

  const payemntStatus = useAppSelector(selectPaymentStatus)
  const verifyIsLoading = useAppSelector(selectverifyIsLoading)
  const {category, productId} = useAppSelector(selectCartDetails)
  const currentUser = useAppSelector(selectCurrentUser)

  const id = currentUser?.id
  const email = currentUser?.email

  useEffect(() => {
    if(reference){
      dispatch(verifypayments(reference))
    }
  }, [])

  const getPlanCode = (plan) => {
    switch (plan) {
      case "GOLD":
        return "PLN_mnqp2d28whexlfg"
      case "PLATINUM":
        return "PLN_dh7mxzwvvs8k7hc"
      case "SUPERNOVA":
        return "PLN_kkecqv2bigm627n"
      default:
        return ""
    }
  }

  useEffect(() => {
    if(payemntStatus === "completed"){
      if(category === "sub" ){

        if(email){
          const planCode = getPlanCode(productId)
          const details = {
            email: email,
            planCode: planCode,
            productId: productId,
            userId: id
          }
          dispatch(subscribeUser(details))
        }
        return
      }else if(id && category && productId){
        dispatch(updateUserPurchase({userId: id, category, productId}))
      } else {
        console.log("something is wrong")
      }
    }
  }, [payemntStatus, category, dispatch, productId, id, email])
  return (
    <div className='confirm-payment' >
        <div className="container">
            { payemntStatus === "completed" && !verifyIsLoading?  <div className="successful">
              <h1>Payment Successful</h1>
              <p>Your purchase has been processed successfully</p>
            </div> : ''}
            { payemntStatus === "failed" && <div className="failed">
              <h1>Verification Failed</h1>
              <p>Verification Failed, check your network and refresh the page</p>
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