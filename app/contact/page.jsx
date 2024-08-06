'use client'


import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/store/hooks'
import emailjs from "@emailjs/browser";
import toast, { Toaster } from 'react-hot-toast';


import { selectCurrentUser } from '@/lib/store/slices/user.reducer';


const Page = () => {

  const currentUser = useAppSelector(selectCurrentUser)
  

    const defaultDetails = {
      name: "",
      email: "",
      feedback: ""
    }
  
    const requestState = {
      notStarted: "notStarted",
      started: "started",
      done: "done"
    }
  
    const [userDetails, setUserDetails] = useState({...defaultDetails})
    const [requestStage, setrequestStage] = useState(requestState.notStarted)
    const [errBorder, setErrBorder] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [loading, setLoading] = useState(false)
  
    const { name, email, feedback } = userDetails

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      setUserDetails({...userDetails, [name]: value})
    }
  
    const resetFormFields = () => {
      setUserDetails(defaultDetails);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setrequestStage(requestState.started)
      

      if(!currentUser){

        if(!name || !email || !feedback){
          setErrBorder(true)
          toast.error("fill all the details, and try again")
          setrequestStage(requestState.notStarted)
    
          return
        }
      } else {
        if(!feedback){
          toast.error("Type your message")
          return
        }
      }
  
      try {
        // console.log(userDetails)
        // resetFormFields();

        setLoading(true)


        const details = { 
          name: currentUser? currentUser.fullName : name,
          email: currentUser? currentUser.email : email,
          message: feedback,
         }

        //  console.log(details)
        emailjs.send("service_xwprcje", "template_c7ijyxd", details, "iT-wruxhihcWr-W2A")
          .then(function(response) {
            setrequestStage(requestState.done);
            toast.success("Message sent successfully")
            setLoading(false);
            resetFormFields()
          }, function(error) {
            console.log(error)
            toast.error(error.message)
              setLoading(false);

              setErrorMessage("an error occured, try again later")
              setrequestStage(requestState.notStarted)
          });
  
      } catch (error) {
        // if (error.code === 'auth/email-already-in-use') {
        //   alert('Cannot create user, email already in use');
        // } else {
        //   console.log('user creation encountered an error', error);
        // }
        console.log(error)
        setLoading(false);
        setErrBorder(true)
        setrequestStage(requestState.notStarted)

       
      }
    };

  
  
    useEffect(() => {
        const timeOut = setTimeout(() => {
          if(errBorder){
            setErrBorder(false)
          }
        }, 3000)
  
        return () => clearTimeout(timeOut)
      
    },[errBorder])
  
    return (
  
      <div className='contact-us' >
        <div className='container' >
            <div className="contact-form">
                <div className="header">
        
                    <h1>Contact Us</h1>
                    {/* <p>We would love to hear from you</p> */}
                </div>
                <form onSubmit={handleSubmit} >
        
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={handleInputChange} value={currentUser? currentUser.fullName : name} placeholder="Eduviere Israel" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleInputChange}  value={currentUser? currentUser.email : email} placeholder="eduviereisrael@gmail.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="feedback" onChange={handleInputChange}  value={feedback} placeholder="Type your message"></textarea>
                  </div>
                  <button type="submit">Send Message { loading && <span className="spinner"></span> }</button>
                </form>
                  
                  
            </div>

           
        </div>
        <Toaster position='top-right' />
 
        
      </div>
    )
}

export default Page