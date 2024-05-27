"use client"

import React from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectCurrentUser, selectUserIsLoading } from "@/lib/store/slices/user.reducer";
import { purchasedHaikuSelector } from '@/lib/store/slices/haiku.reducer';
import { Inter } from "next/font/google";
import HaikuContainer from '@/components/haikuContainer';
const inter = Inter({ subsets: ["latin"] });


const Dashboard = () => {

  const currentUser = useAppSelector(selectCurrentUser)
  const userIsLoading = useAppSelector(selectUserIsLoading)
  const purchasedHaiku = useAppSelector(purchasedHaikuSelector)

  const { fullName } = currentUser? currentUser : false

  return (
    <div className='user-dashboard' >
      <div className="container">
        <div className="purchases-div">
          <h3>Hi {currentUser?.fullName}</h3>
          <div className="purchases-cont">
            <div className="filter">
              <span>Haiku</span>
              {/* <span>Poems</span> */}
            </div>
            { purchasedHaiku.length && <HaikuContainer haikuWallpapers={purchasedHaiku} /> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard