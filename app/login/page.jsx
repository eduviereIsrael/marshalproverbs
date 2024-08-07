"use client"

import { InputTag } from '@/components'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { signInUser, selectCurrentUser, selectUserIsLoading,selectLastVisited, selectUserError, setUserError } from '@/lib/store/slices/user.reducer';
import toast, {Toaster} from 'react-hot-toast';

import { useRouter } from 'next/navigation';

const Login = () => {

  const Router = useRouter()

  const defaultDetails = {
    email: "",
    password: "",
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
  const lastVisited = useAppSelector(selectLastVisited)

  const dispatch = useAppDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setrequestStage(requestState.started)
    const { email, password } = userDetails

    if(!email || !password){
      setErrBorder(true)
      dispatch(setUserError("No email or password"))
      return;
    }
    // console.log(userDetails)
    dispatch(signInUser({email, password}))

  }


  const getErrors = (error) => {
    switch(error){
      case 'Firebase: Error (auth/invalid-credential).':
        return 'Email or Password incorrect'
      case 'auth/wrong-password':
        return 'Wrong password'
      case "No email or password":
        return 'Check your email/password'
      case 'Failed to get document because the client is offline.':
        return "Check your internet and try again"
      case 'Firebase: Error (auth/network-request-failed).':
        return "Check your internet and try again"
      default:
        return error
    }
  }


  useEffect(() => {
    if (currentUser) {
      const defaultDetail = {
        email: "",
        password: "",
      };
      toast.success("logged in successfully");
      setUserDetails(defaultDetail);

      const timeOut = setTimeout(() => {

        lastVisited? Router.push(lastVisited) : Router.push("/");
      }, 2000);

      return () => clearTimeout(timeOut);
    }
  }, [currentUser, Router, lastVisited]);

  
  useEffect(() => {
    if(userError){
      toast.error(getErrors(userError))
      setErrBorder(true)

    }
  }, [userError])

  // useEffect(() => {
  //   console.log(userIsLoading)
  // }, [userIsLoading])

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(errBorder){
        // toast.error(getErrors(userError))
        setErrBorder(false)
        if(userError){
          dispatch(setUserError(null))
        }
      }
    }, 2000)

    return () => clearTimeout(timeOut)
    
  },[errBorder, dispatch, userError])

  return (

    <div className="login">
      <div className="container">
        <div className='auth-container' >
          <div className="header">

            <h1>Log in to your account</h1>
            <p>Welcome back! Please enter your details</p>
          </div>
          <form onSubmit={handleSubmit} >

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
              type={'password'}
              onChangeHandler={handleInputChange}
              value={userDetails.password}
            />
            <span 
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center"
              }} 
            >
            {/* <label for="rememberMeCheckbox" 
              style={{
                fontFamily: "Poppins",
                fontSize:"14px",
                color: "#344054"
              }} 
            >
              <input type="checkbox" onChange={handleCheckboxChange} id="rememberMeCheckbox" name="rememberMe" /> Remember Me
            </label> */}

            {/* <Link href={'/resetpassword'} ><p style={{ 
              fontSize: "14px",
              fontWeight: "500"
            }} >Forgot password</p></Link> */}
            </span>
            <button className='link-button' type='submit' > {userIsLoading? <span className='spinner' ></span> : 'Login'} </button>
            {/* <PrimaryBtn style={{marginTop: "24px"}} > { requestStage === requestState.started? <span className='spinner' ></span> : 'Log in'} </PrimaryBtn> */}
            {/* { errBorder && <p style={{width: "100%", textAlign: "left", fontSize: "12px", color: "#F0263C"}} >{getErrors(userError)}</p>} */}
          </form>
            {/* <SecondaryBtn style={{marginTop: "16px"}} onClick={signInWithGoogle} > <img src='/google.svg' /> Log in with Google</SecondaryBtn> */}
            <span className='other-option' ><span>Don&apos;t have an account?</span><Link href={'/signup'} ><p>Sign up</p></Link></span>
            
          {/* <p className='other-option' ><span>Don&apos;t have an account?</span><Link href={'/signup'} ><p>Sign up</p></Link></p> */}
        </div>

        <Toaster
            position="top-right"
            reverseOrder={false}
          />

      </div>
    </div>
  )
}

export default Login