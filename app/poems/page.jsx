"use client"

import React, {useCallback, useEffect, useState} from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { selectPoemForms, filterPoems, selectFilteredPoems, selectAllPoemsReducer,poemCategorySelector } from '@/lib/store/slices/poems.reducer'
import { setCartDetails, setCartError } from '@/lib/store/slices/cart.reducer';
import { selectCurrentUser } from '@/lib/store/slices/user.reducer';
import { PoemsContainer, PlanCard } from '@/components'
import { useSearchParams } from 'next/navigation' 
import Link from 'next/link';


const PoemsPage = () => {

  const forms = useAppSelector(selectPoemForms)
  const filteredPoems = useAppSelector(selectFilteredPoems)
  const poems = useAppSelector(selectAllPoemsReducer)
  // const [selectedForm, setSelectedForm] = useState('All')
  const selectedForm = useAppSelector(poemCategorySelector)


  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)
  const query = useSearchParams()

  const form = query.get('form')
  const poem = query.get('poem')

  
  const selectFormHandler = useCallback((form) => {
    // setSelectedForm(form)
    dispatch(filterPoems(form))

  }, [dispatch])

  const stringToSlug = str => str.toLowerCase().replace(/[\s.]+/g, '-');


  const viewedPoem = useCallback((poemClicked) => poems.find(poem => stringToSlug(poem?.title) === poemClicked), [poems])

  const pickedStyle = {
    backgroundColor: '#000',
    color: '#fff'
  }

  useEffect(() => {
    // console.log(form)
    if(form){
      selectFormHandler(form)
      // console.log('this code ran')
    }
  }, [selectFormHandler, form])

  // useEffect(() => {
  //   // console.log(form)
  //   if(poem){
  //     console.log(viewedPoem(poem))
  //     // console.log(poems)
  //   }
  // }, [poem, viewedPoem])

  const replaceUnderscore = (str) => str.replace(/_/g, ' ')

  const getBg = (tagPlan) => {
    switch(tagPlan.toLowerCase()){
        case 'gold':
            return '#8d99ae'
        case 'platinum' :
            return '#AF9070'
        default:
            return '#656d4a'
    }
  }

  const subscriptionPlansDetails = {
    gold: {
      title: "Subscribe to GOLD and get access to over 30 poems on the platform.",
      description: "Access to over 20+ poems",
      price: 499,
      label: "GOLD subscription",
      imageUrl: "/gold.png",
      tier: "GOLD"
    },
    platinum: {
      title: "Subscribe to PLATINUM and get access to over 50 poems on the platform.",
      description: "Access to over 30+ poems, and everything on GOLD",
      price: 999,
      label: "PLATINUM subscription",
      imageUrl: "/platinum.png",
      tier: "PLATINUM"
    },
    supernova: {
      title: "Subscribe to SUPERNOVA and get access to all poems on the platform.",
      description: "Access to over 30+ poems",
      price: 1499,
      label: "SUPERNOVA subscription",
      imageUrl: "/supernova.png",
      tier: "SUPERNOVA"
    }
  };
  
  

  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
  };

  return (
    <div className='poems-page' >
       { !poem? <div className="container">
            <h1>Poems</h1>
            
            <div className="filter">
              <span onClick={() => selectFormHandler('All')} style={selectedForm.toLowerCase() === 'All'.toLowerCase()? {...pickedStyle} : {}} >All</span>
              {
               
              
                forms.map(form => (<span key={form} style={selectedForm.toLowerCase() === form.toLowerCase()? {...pickedStyle} : {}} onClick={() => selectFormHandler(form)} >{replaceUnderscore(form)}</span>))
              }
            </div>
            { selectedForm === 'All'? <PoemsContainer poems={poems} color='black' /> :  filteredPoems.length && <PoemsContainer poems={filteredPoems} color='black' />}
        </div>
        :
        <div className="poem-view">

        <div className=" container">
          <Link href={'/poems'} >
            <p> {"<"} Back to poems</p>
          </Link>
          <div className="authors-note">
            <h2>{viewedPoem(poem).title}</h2>
            <div className="poet-note">
              <h2 className='title' >Poet&apos;s note</h2>
              <p>{viewedPoem(poem).poetsNote}</p>
            </div>
          
          </div>
          <PlanCard plan={subscriptionPlansDetails[viewedPoem(poem).subscriptionPlan.toLowerCase()]} title={viewedPoem(poem).title} color={getBg(viewedPoem(poem).subscriptionPlan.toLowerCase())} />
          {/* <div className="subscription-card">
            <h2>Subscribe to Gold and gain full access to {"Celestial Whispers"} and many other poems.</h2>
            <button className="subscribe-button">Subscribe</button>
            <p>$3 Per month</p>
          </div> */}

          <div className="comments-section">
            <h2>Comments(0)</h2>
            {/* <div className="comment">
              <p>{"Your poem delicately balances on the edge of revelation, like a Jenga tower on the brink of collapse. Each stanza pulls me deeper into the mystery, leaving me hanging on every word."} <br/><span className="comment-author">Sophia Rivers</span></p>
            </div>
            <div className="comment">
              <p>{"In 'The Jenga of Suspense,' you've masterfully crafted a labyrinth of anticipation. It's as if each line is a block in the tower, building tension until the final verse. Brilliantly suspenseful!" }<br/><span className="comment-author">Elijah Stone</span></p>
            </div>
            <div className="comment">
              <p>{"Your poem evokes a palpable sense of intrigue and uncertainty. It's like playing Jenga with words, carefully extracting meaning while leaving enough unsaid to keep me enthralled. Well done!" }<br/><span className="comment-author">Ana Monroe</span></p>
            </div>
            <div className="comment">
              <p>{"I love how 'The Jenga of Suspense' captures the essence of suspense in its structure and narrative. Each stanza adds another layer of complexity, drawing the reader deeper into the enigma you've created." }<br/><span className="comment-author">Isabella Cruz</span></p>
            </div> */}
          </div>
      </div>
        </div>}
    </div>
  )

}

export default PoemsPage