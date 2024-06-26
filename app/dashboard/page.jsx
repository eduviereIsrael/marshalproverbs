"use client"

import React, {useState, useRef, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectCurrentUser, selectUserIsLoading, selectClearDate } from "@/lib/store/slices/user.reducer";
import { purchasedHaikuSelector, allHaikuSelector, fetchPurchasedHaikus, haikuIsLoadingSelector } from '@/lib/store/slices/haiku.reducer';
import { Inter } from "next/font/google";
import { selectAllPoemsReducer } from "@/lib/store/slices/poems.reducer"
import { PoemsContainer } from '@/components';
const inter = Inter({ subsets: ["latin"] });


const HaikuContainer = ({haikuWallpapers}) => {


  const [constStyle, setContStyle] = useState(0)
  const divRef = useRef()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)

  const replaceUnderscore = (str) => str?.replace(/_/g, ' ')

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


  const downloadImages = (links, theme) => {
    links.forEach((linksImg, index) => {
      fetch(linksImg.url)
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${theme}-${index + 1}.png`; // Change the extension if necessary
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => console.error('Error downloading image:', error));
      });
    
  }

    
  return (
    <div className="haiku-cont"   >
        { haikuWallpapers?.map(poem => (
            <div className='haiku-card' key={poem.theme} >
                <div className="border">

                <div className="heading">

                    {replaceUnderscore(poem.theme)}
                </div>
                <div className="inner">
                    
                    <div className="big-img">
                        <img src={poem?.wallpapers[0]?.url && poem?.wallpapers[0]?.url} alt="" />
                    </div>
                    <div className="sml-img">
                        <div className="img">

                        <img src={poem?.wallpapers[1]?.url && poem?.wallpapers[1]?.url} alt="" />
                        </div>

                        <div className="img-left">
                            {poem.wallpapers.length - 2} more
                        </div>
                    </div>
                </div>
                <p className='price' ></p>
                {/* <button>Buy Now</button> */}
                <button onClick={() => downloadImages(poem.wallpapers, poem.theme)} >Download {poem.wallpapers.length}</button>

            </div>
                </div>
        )) }
    </div>
  )
}

const Dashboard = () => {
  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(selectCurrentUser)
  const clearDate = useAppSelector(selectClearDate)
  const userIsLoading = useAppSelector(selectUserIsLoading)
  const purchasedHaiku = useAppSelector(purchasedHaikuSelector)
  const allHaiku = useAppSelector(allHaikuSelector)
  const allPoems = useAppSelector(selectAllPoemsReducer)
  const purchasedHaikuIsLoading = useAppSelector(haikuIsLoadingSelector)

  const plan = currentUser?.sub?.plan

  const { fullName } = currentUser? currentUser : false

  const paidWallpapers = currentUser?.purchases?.haikuWallpapers

  const [displayedCategory, setDisplayedCategory] = useState("haiku")


  const getPoemsByPlan = (plan, poems) => {
    switch (plan) {
        case 'gold':
            return poems?.filter(poem => poem.subscriptionPlan.toLowerCase() == 'gold');
        case 'platinum':
            return poems?.filter(poem => poem.subscriptionPlan.toLowerCase() == 'gold' || poem.subscriptionPlan.toLowerCase() == 'platinum');
        case 'supernova':
            return poems?.filter(poem => poem.subscriptionPlan.toLowerCase() == 'gold' || poem.subscriptionPlan.toLowerCase() == 'platinum' || poem.subscriptionPlan.toLowerCase() == 'supernova' );
        default:
            return [];
    }
};
  const displayHaiku = purchasedHaiku?.length && displayedCategory === "haiku"

  const displayPoems = displayedCategory === "poems" && plan




  return (
    <div className='user-dashboard' >
      <div className="container">
        { currentUser && <div className="purchases-div">
          <h3 onClick={() => console.log(currentUser, clearDate)} >Hi {currentUser?.fullName}</h3>
          <div className="purchases-cont">
            <div className="filter">
              <span onClick = {() => setDisplayedCategory("haiku")} >Haiku Wallpapers</span>
              <span onClick = {() => {
                setDisplayedCategory("poems")
                }}  >Poems</span>
              {/* <span>Poems</span> */}
            </div>
            { displayHaiku && <HaikuContainer haikuWallpapers={purchasedHaiku}  /> }
            { purchasedHaikuIsLoading && <span className= "spinner dark" ></span> }
            { !purchasedHaikuIsLoading && !purchasedHaiku.length? <h5>No purchased haiku wallpaper to download currently</h5> : '' }
            { displayPoems && <PoemsContainer poems = {getPoemsByPlan( plan.toLowerCase(), allPoems)} color = "#000" download = {true} /> }
          </div>
        </div> }
        { userIsLoading && <span className='spinner dark' ></span> }
        { !userIsLoading && !currentUser? <div className="error">Sign in to view your purchases</div> : '' }
      </div>
    </div>
  )
}

export default Dashboard