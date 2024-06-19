"use client"

import { InputTag } from '@/components'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { signUpUser, selectCurrentUser, selectUserIsLoading, selectUserError, setUserError } from '@/lib/store/slices/user.reducer';



const SignUp = () => {
  
  const defaultDetails = {
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",

  }

  const [userDetails, setUserDetails] = useState(defaultDetails);
  const [errBorder, setErrBorder] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({...userDetails, [name]: value})
  }

  const currentUser = useAppSelector(selectCurrentUser)
  const userIsLoading = useAppSelector(selectUserIsLoading)
  const userError = useAppSelector(selectUserError)

  const dispatch = useAppDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    // setrequestStage(requestState.started)
    
    const { email, password, confirmPassword, fullName } = userDetails;
    
    const newUser = {
      sub: {
        plan: 'Starter',
        id: null
      },
      fullName: fullName,
      purchases: {
        poems: [],
        haikuWallpapers: [],
        books: []
      },
      paymentHistory: []
    }

    if(password.length < 6){
      dispatch(setUserError('Firebase: Password should be at least 6 characters (auth/weak-password).'))
      return
    }

    if(password === confirmPassword){
      dispatch(signUpUser({email, password, newUser}))
      return
    } else{
        dispatch(setUserError('Passwords do not match'))
        setErrBorder(true)
        return;
    }

  }

  
  const getErrors = (error) => {
    switch(error){
      case 'Firebase: Error (auth/invalid-credential).':
        return 'Email or Password incorrect'
      case 'Firebase: Error (auth/email-already-in-use).':
        return 'Email in use, try logging in'
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        return 'Password should be at least 6 characters'
      case 'Failed to get document because the client is offline.':
        return "Check your internet and try again"
      case 'Firebase: Error (auth/network-request-failed).':
        return "Check your internet and try again"
      default:
        return error
    }
  }
  
  useEffect(() => {
    if(userError){
      // console.log(getErrors(userError))
      setErrBorder(true)

    }
  }, [userError])

  // useEffect(() => {
  //   console.log(userIsLoading)
  // }, [userIsLoading])

  
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(errBorder){
        setErrBorder(false)
        if(userError){
          dispatch(setUserError(null))
        }
      }
    }, 5000)

    return () => clearTimeout(timeOut)
    
  },[errBorder, dispatch, userError])

  return (

    <div className="sign-up">
      <div className="container">
        <div className='auth-container' >
          <div className="header">

            <h1>Create an account</h1>
            {/* <p>Welcome back! Please enter your details</p> */}
          </div>
          <form onSubmit={handleSubmit} >

            <InputTag
              tagName={'fullName'}
              Label={'Full name'}
              placeHolder={'Enter your Full Name'}
              type={'text'}
              onChangeHandler={handleInputChange}
              value={userDetails.fullName}
            />

            <InputTag
              tagName={'email'}
              Label={'Email'}
              placeHolder={'Enter your email'}
              type={'email'}
              onChangeHandler={handleInputChange}
              value={userDetails.email}
            />

            <InputTag
              tagName={'password'}
              Label={'Password'}
              placeHolder={'********'}
              type={'text'}
              onChangeHandler={handleInputChange}
              value={userDetails.password}
            />
            <InputTag
              tagName={'confirmPassword'}
              Label={'Confirm Password'}
              placeHolder={'********'}
              type={'text'}
              onChangeHandler={handleInputChange}
              value={userDetails.confirmPassword}
            />
            
            {/* <PrimaryBtn style={{marginTop: "24px"}} > { requestStage === requestState.started? <span className='spinner' ></span> : 'Log in'} </PrimaryBtn> */}
            {/* {errorMessage && <p style={{width: "100%", textAlign: "right", fontSize: "12px", color: "#F0263C"}} >{errorMessage}</p>} */}
            { errBorder && <p style={{width: "100%", textAlign: "left", fontSize: "12px", color: "#F0263C"}} >{getErrors(userError)}</p>}

            <button className='link-button' type='submit' > {userIsLoading? <span className='spinner' ></span> : 'Sign Up'} </button>
          </form>


            {/* <SecondaryBtn style={{marginTop: "16px"}} onClick={signInWithGoogle} > <img src='/google.svg' /> Log in with Google</SecondaryBtn> */}
            <span className='other-option' ><span>Already have an account?</span><Link href={'/login'} ><p>Sign in</p></Link></span>
            
          {/* <p className='other-option' ><span>Don&apos;t have an account?</span><Link href={'/signup'} ><p>Sign up</p></Link></p> */}
        </div>

      </div>
    </div>
  )
}

export default SignUp