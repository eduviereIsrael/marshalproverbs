"use client"

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCurrentUser, signOut, selectClearDate, setLastVisited } from '@/lib/store/slices/user.reducer';
import { signInAtFirstRender, checkSub } from '@/lib/store/slices/user.reducer'; 
import { PaymentOverlay } from '..';
import { selectPaymentOverlay } from '@/lib/store/slices/cart.reducer';
import { setAllPoems, selectAllPoemsReducer } from "@/lib/store/slices/poems.reducer"
import { allHaikuSelector, setHaiku } from "@/lib/store/slices/haiku.reducer"
import { useUrl } from 'nextjs-current-url';


const Navbar = ({data}) => {

  const [navClick, setNavClick] = useState(false)
  const [userNavClick, setUserNavClick] = useState(false)

  const router = useRouter()
  const url = useUrl()

  const navigate = (url) => router.push(url)
  const currentUser = useAppSelector(selectCurrentUser)
  const clearDate = useAppSelector(selectClearDate)
  const paymentOverlay = useAppSelector(selectPaymentOverlay)

  const dispatch = useAppDispatch()

  const poemsListed = useAppSelector(selectAllPoemsReducer)
  const haikuListed = useAppSelector(allHaikuSelector)

  const signOutHandler = () => dispatch(signOut())
  const fullUrl = router.asPath;


  useEffect(() => {
      dispatch(setAllPoems(data.poems))
  }, [data.poems, dispatch, poemsListed?.length])

  useEffect(() => {
      dispatch(setHaiku(data.haikuWallpapers))
  }, [dispatch, data.haikuWallpapers])

  useEffect(() => {
    const isDatePastOrFuture = (dateString) => {
      if(!dateString){
        return "past"
      }
      const inputDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ignore the time part for accurate comparison
      if (inputDate < today) {
        return 'past';
        
      } else if (inputDate > today) {
        return 'future';
      } else {
        return 'today';
      }
    };


    if(isDatePastOrFuture(clearDate) == "past"){
      dispatch(signInAtFirstRender())
    } else {
      if(currentUser){
        dispatch(checkSub({userId: currentUser.id, id: currentUser?.sub?.id}))
      }
    }
  }, [currentUser, dispatch, clearDate])

  useEffect(() => {
    // console.log(data)
    function convertPoemsToObject(data) {
      const poemObject = {};
      data.poems.forEach(poem => {
        poemObject[poem.title] = poem.createdAt;
      });
      return poemObject;
    }

    function extractPoemsArray(jsonString) {
      // Parse the JSON string into an object
      const parsedData = JSON.parse(jsonString);
      
      // Extract and return the poems array
      return parsedData.data.poems;
    }

    
    //   const data = {
    //     "poems": [
    //       {
    //         "title": "Resonance",
    //         "createdAt": "2024-09-08T11:33:26.065067+00:00"
    //       },
    //       {
    //         "title": "The Chambers Of Emotions",
    //         "createdAt": "2024-09-08T11:36:41.319546+00:00"
    //       },
    //       {
    //         "title": "Once I Was",
    //         "createdAt": "2024-09-08T11:39:49.70023+00:00"
    //       },
    //       {
    //         "title": "I am a Poet",
    //         "createdAt": "2024-09-08T11:43:39.890244+00:00"
    //       },
    //       {
    //         "title": "The Excerpt of a Traveler",
    //         "createdAt": "2024-09-08T22:34:43.306785+00:00"
    //       },
    //       {
    //         "title": "Coronation of Peace",
    //         "createdAt": "2024-09-08T23:19:21.558968+00:00"
    //       },
    //       {
    //         "title": "Wrap Up",
    //         "createdAt": "2024-09-08T23:22:12.792249+00:00"
    //       },
    //       {
    //         "title": " Kind Words",
    //         "createdAt": "2024-09-09T11:42:02.579991+00:00"
    //       },
    //       {
    //         "title": "Cosmic Journey",
    //         "createdAt": "2024-09-09T11:45:07.794373+00:00"
    //       },
    //       {
    //         "title": "I Breathe Again",
    //         "createdAt": "2024-09-09T11:58:15.651043+00:00"
    //       },
    //       {
    //         "title": "Sanctuary",
    //         "createdAt": "2024-09-09T13:49:03.116566+00:00"
    //       },
    //       {
    //         "title": "Judah",
    //         "createdAt": "2024-09-09T13:51:23.0568+00:00"
    //       },
    //       {
    //         "title": "Lord Peniel",
    //         "createdAt": "2024-09-09T13:55:29.283146+00:00"
    //       },
    //       {
    //         "title": "Perfect Jubilee",
    //         "createdAt": "2024-09-09T13:59:03.57538+00:00"
    //       },
    //       {
    //         "title": "Lord Constant",
    //         "createdAt": "2024-09-09T14:02:53.134749+00:00"
    //       },
    //       {
    //         "title": "Forgiven",
    //         "createdAt": "2024-09-09T14:06:39.996271+00:00"
    //       },
    //       {
    //         "title": "Risen",
    //         "createdAt": "2024-09-09T14:10:56.363575+00:00"
    //       },
    //       {
    //         "title": "Lord Pinnacle",
    //         "createdAt": "2024-09-09T15:15:48.895823+00:00"
    //       },
    //       {
    //         "title": "Moshe (Moses)",
    //         "createdAt": "2024-09-09T15:18:58.748952+00:00"
    //       },
    //       {
    //         "title": "Asher",
    //         "createdAt": "2024-09-09T15:22:33.945172+00:00"
    //       },
    //       {
    //         "title": "God's Genome",
    //         "createdAt": "2024-09-09T15:25:24.734591+00:00"
    //       },
    //       {
    //         "title": "When We Were Young",
    //         "createdAt": "2024-09-09T15:42:51.905215+00:00"
    //       },
    //       {
    //         "title": "Joseph",
    //         "createdAt": "2024-09-09T15:48:39.44075+00:00"
    //       },
    //       {
    //         "title": "Things Get Scary",
    //         "createdAt": "2024-09-09T15:54:47.675022+00:00"
    //       },
    //       {
    //         "title": "Ezekiel",
    //         "createdAt": "2024-09-09T15:59:28.309743+00:00"
    //       },
    //       {
    //         "title": "Lord Pitcher",
    //         "createdAt": "2024-09-09T16:03:09.841427+00:00"
    //       },
    //       {
    //         "title": "Vortex Air",
    //         "createdAt": "2024-09-09T16:34:39.087821+00:00"
    //       },
    //       {
    //         "title": "Living Dead",
    //         "createdAt": "2024-09-09T16:42:12.015542+00:00"
    //       },
    //       {
    //         "title": "The First Time",
    //         "createdAt": "2024-09-09T16:48:33.102023+00:00"
    //       },
    //       {
    //         "title": "Star Flight",
    //         "createdAt": "2024-09-09T16:56:00.174349+00:00"
    //       },
    //       {
    //         "title": "Light",
    //         "createdAt": "2024-09-09T16:58:15.339081+00:00"
    //       },
    //       {
    //         "title": "Misfits that fits",
    //         "createdAt": "2024-09-09T19:41:09.200927+00:00"
    //       },
    //       {
    //         "title": "In Unity",
    //         "createdAt": "2024-09-09T22:08:13.924022+00:00"
    //       },
    //       {
    //         "title": "Your Heritage",
    //         "createdAt": "2024-09-09T22:12:19.860468+00:00"
    //       },
    //       {
    //         "title": " I Need A Truckload Of These",
    //         "createdAt": "2024-09-09T22:14:44.266005+00:00"
    //       },
    //       {
    //         "title": "Spring With You",
    //         "createdAt": "2024-09-09T22:23:04.160835+00:00"
    //       },
    //       {
    //         "title": "Intimacy II",
    //         "createdAt": "2024-09-09T22:45:52.920568+00:00"
    //       },
    //       {
    //         "title": "Art Of Tanka",
    //         "createdAt": "2024-09-09T23:20:01.983983+00:00"
    //       },
    //       {
    //         "title": "Locust",
    //         "createdAt": "2024-09-09T23:29:40.907747+00:00"
    //       },
    //       {
    //         "title": "The Rescue Mission",
    //         "createdAt": "2024-09-09T23:36:11.960845+00:00"
    //       },
    //       {
    //         "title": " Ideal Man",
    //         "createdAt": "2024-09-09T23:40:41.909505+00:00"
    //       },
    //       {
    //         "title": "Lizard",
    //         "createdAt": "2024-09-10T09:09:34.328343+00:00"
    //       },
    //       {
    //         "title": "Body Wash",
    //         "createdAt": "2024-09-10T09:12:47.920308+00:00"
    //       },
    //       {
    //         "title": "Ant",
    //         "createdAt": "2024-09-10T09:16:22.344573+00:00"
    //       },
    //       {
    //         "title": "Red Sea Mysteries I",
    //         "createdAt": "2024-09-10T09:20:26.540152+00:00"
    //       },
    //       {
    //         "title": "Red Sea Mysteries V",
    //         "createdAt": "2024-09-10T09:22:51.210394+00:00"
    //       },
    //       {
    //         "title": "Moshe",
    //         "createdAt": "2024-09-10T09:25:16.126881+00:00"
    //       },
    //       {
    //         "title": "Red Sea Mysteries II",
    //         "createdAt": "2024-09-10T09:33:56.929093+00:00"
    //       },
    //       {
    //         "title": "Passover",
    //         "createdAt": "2024-09-10T09:37:12.809667+00:00"
    //       },
    //       {
    //         "title": "Living Rock",
    //         "createdAt": "2024-09-10T09:40:18.541772+00:00"
    //       },
    //       {
    //         "title": "The Well",
    //         "createdAt": "2024-09-10T09:42:53.76989+00:00"
    //       },
    //       {
    //         "title": "Vistal Portal",
    //         "createdAt": "2024-09-10T09:45:50.811688+00:00"
    //       },
    //       {
    //         "title": "Tent Of God",
    //         "createdAt": "2024-09-10T09:48:01.026651+00:00"
    //       },
    //       {
    //         "title": "Red Sea Mysteries III",
    //         "createdAt": "2024-09-10T09:51:26.588021+00:00"
    //       },
    //       {
    //         "title": "Red Sea Mysteries VI",
    //         "createdAt": "2024-09-10T09:55:14.746006+00:00"
    //       },
    //       {
    //         "title": "Presence Of God",
    //         "createdAt": "2024-09-10T12:03:24.335389+00:00"
    //       },
    //       {
    //         "title": " New Skins",
    //         "createdAt": "2024-09-10T12:07:54.543318+00:00"
    //       },
    //       {
    //         "title": "Strange Acts Of God",
    //         "createdAt": "2024-09-10T12:13:39.526676+00:00"
    //       },
    //       {
    //         "title": "Red Sea Mysteries IV",
    //         "createdAt": "2024-09-10T12:17:42.886329+00:00"
    //       },
    //       {
    //         "title": "The Light Of God",
    //         "createdAt": "2024-09-10T12:21:41.883107+00:00"
    //       },
    //       {
    //         "title": "Aesthetic",
    //         "createdAt": "2024-09-13T23:51:21.340479+00:00"
    //       },
    //       {
    //         "title": "Miracle Of Sunrise",
    //         "createdAt": "2024-09-14T00:01:47.532692+00:00"
    //       },
    //       {
    //         "title": "SPRING WITH YOU-1",
    //         "createdAt": "2024-09-14T00:05:24.110152+00:00"
    //       },
    //       {
    //         "title": "Ride Of The Cherubim",
    //         "createdAt": "2024-09-14T00:08:36.266318+00:00"
    //       },
    //       {
    //         "title": "Night-Wish",
    //         "createdAt": "2024-09-14T00:13:36.228824+00:00"
    //       },
    //       {
    //         "title": "Wedding Bells",
    //         "createdAt": "2024-09-14T00:18:12.507775+00:00"
    //       },
    //       {
    //         "title": "WHEN DID WE GET HERE",
    //         "createdAt": "2024-09-14T00:23:56.04482+00:00"
    //       },
    //       {
    //         "title": "My Lady",
    //         "createdAt": "2024-09-14T00:53:53.263092+00:00"
    //       },
    //       {
    //         "title": "Uncharted Waters",
    //         "createdAt": "2024-09-14T00:57:53.2811+00:00"
    //       },
    //       {
    //         "title": " Personal - I APPRECIATE YOU",
    //         "createdAt": "2024-09-19T17:59:44.787536+00:00"
    //       },
    //       {
    //         "title": "MY COMMITMENT",
    //         "createdAt": "2024-09-19T18:09:42.496072+00:00"
    //       },
    //       {
    //         "title": "Maga",
    //         "createdAt": "2024-09-19T18:14:05.777923+00:00"
    //       },
    //       {
    //         "title": " DAWN OF AGES",
    //         "createdAt": "2024-09-19T18:19:34.855878+00:00"
    //       },
    //       {
    //         "title": "THE EARTH.",
    //         "createdAt": "2024-09-19T18:23:02.066661+00:00"
    //       },
    //       {
    //         "title": "SHAMA ",
    //         "createdAt": "2024-09-19T18:26:12.068237+00:00"
    //       },
    //       {
    //         "title": "THE DYNASTY OF BLACKNESS",
    //         "createdAt": "2024-09-19T18:28:33.599295+00:00"
    //       },
    //       {
    //         "title": " I PRAY FOR YOU",
    //         "createdAt": "2024-09-20T00:06:15.430999+00:00"
    //       },
    //       {
    //         "title": "I TREASURE YOU.",
    //         "createdAt": "2024-09-20T00:09:13.415859+00:00"
    //       },
    //       {
    //         "title": "Personal - THE COMMITMENT",
    //         "createdAt": "2024-09-20T00:21:23.263083+00:00"
    //       },
    //       {
    //         "title": "FATHER",
    //         "createdAt": "2024-09-20T00:27:03.988022+00:00"
    //       },
    //       {
    //         "title": " I RESPECT YOU",
    //         "createdAt": "2024-09-20T00:32:07.522612+00:00"
    //       },
    //       {
    //         "title": " A letter",
    //         "createdAt": "2024-09-20T00:36:44.903241+00:00"
    //       },
    //       {
    //         "title": "Personal - I TRUST YOU",
    //         "createdAt": "2024-09-20T00:40:08.50211+00:00"
    //       },
    //       {
    //         "title": "Personal - I FANCY YOU",
    //         "createdAt": "2024-09-20T00:42:49.649755+00:00"
    //       },
    //       {
    //         "title": "Personal - I NEED YOU",
    //         "createdAt": "2024-09-20T00:47:50.509424+00:00"
    //       },
    //       {
    //         "title": "Deep Depths Wakens",
    //         "createdAt": "2024-09-20T20:41:03.088863+00:00"
    //       },
    //       {
    //         "title": "Hunger And Outpourings",
    //         "createdAt": "2024-09-20T20:46:23.697561+00:00"
    //       },
    //       {
    //         "title": "Familia (Family)",
    //         "createdAt": "2024-09-20T20:50:49.792093+00:00"
    //       },
    //       {
    //         "title": "YHVH",
    //         "createdAt": "2024-09-20T20:55:00.259232+00:00"
    //       },
    //       {
    //         "title": "Penuel Series",
    //         "createdAt": "2024-09-20T21:00:28.337547+00:00"
    //       },
    //       {
    //         "title": "Hunger",
    //         "createdAt": "2024-09-20T21:05:26.022437+00:00"
    //       },
    //       {
    //         "title": "Melchizedek",
    //         "createdAt": "2024-09-20T21:10:00.513958+00:00"
    //       },
    //       {
    //         "title": "Prophet",
    //         "createdAt": "2024-09-20T21:15:50.453923+00:00"
    //       },
    //       {
    //         "title": "Resurrection",
    //         "createdAt": "2024-09-20T21:22:27.389096+00:00"
    //       },
    //       {
    //         "title": "ANGELS",
    //         "createdAt": "2024-09-20T21:26:16.752796+00:00"
    //       },
    //       {
    //         "title": " I AM",
    //         "createdAt": "2024-09-20T21:30:36.315521+00:00"
    //       },
    //       {
    //         "title": "Love Thou Pen.",
    //         "createdAt": "2024-09-21T01:11:57.648696+00:00"
    //       },
    //       {
    //         "title": "Dear Son",
    //         "createdAt": "2024-09-21T01:24:48.438381+00:00"
    //       },
    //       {
    //         "title": "Edunu - Olori Mi",
    //         "createdAt": "2024-09-21T01:32:16.007522+00:00"
    //       },
    //       {
    //         "title": "G.P.W.",
    //         "createdAt": "2024-09-21T01:35:54.257723+00:00"
    //       }
    //     ]
    //   }

    //   const dataTwo = {
    //     "poems": [
    //       {
    //         "title": "XXIV",
    //         "createdAt": "2024-05-15T00:45:05.677438+00:00"
    //       },
    //       {
    //         "title": "SPRING WITH YOU",
    //         "createdAt": "2024-05-15T00:52:31.453416+00:00"
    //       },
    //       {
    //         "title": "VORTEX AIR",
    //         "createdAt": "2024-05-15T00:57:09.809012+00:00"
    //       },
    //       {
    //         "title": "I BLOSSOM STILL",
    //         "createdAt": "2024-05-15T00:59:46.352284+00:00"
    //       },
    //       {
    //         "title": "THE JENGA OF SUSPENSE",
    //         "createdAt": "2024-05-15T01:03:04.238536+00:00"
    //       },
    //       {
    //         "title": "SIX BILLS IN M.I",
    //         "createdAt": "2024-05-15T01:12:09.79829+00:00"
    //       },
    //       {
    //         "title": "Delightful Silence",
    //         "createdAt": "2024-07-16T19:13:52.479911+00:00"
    //       },
    //       {
    //         "title": "End Of Time",
    //         "createdAt": "2024-07-16T19:16:42.139509+00:00"
    //       },
    //       {
    //         "title": "Friendship",
    //         "createdAt": "2024-07-16T19:20:16.63396+00:00"
    //       },
    //       {
    //         "title": "Gold's Price",
    //         "createdAt": "2024-07-16T19:24:26.350793+00:00"
    //       },
    //       {
    //         "title": "Hexagon",
    //         "createdAt": "2024-07-16T19:27:53.318811+00:00"
    //       },
    //       {
    //         "title": "I Need A Spacecraft Of These",
    //         "createdAt": "2024-07-16T19:32:25.134923+00:00"
    //       },
    //       {
    //         "title": "I Need A Truckload Of These",
    //         "createdAt": "2024-07-16T19:42:43.635969+00:00"
    //       },
    //       {
    //         "title": "En Route",
    //         "createdAt": "2024-08-20T22:49:59.038792+00:00"
    //       },
    //       {
    //         "title": "Grace And Mercy",
    //         "createdAt": "2024-08-20T22:54:19.375619+00:00"
    //       },
    //       {
    //         "title": "Ideal Man",
    //         "createdAt": "2024-08-20T22:55:26.942493+00:00"
    //       },
    //       {
    //         "title": "INTIMACY II",
    //         "createdAt": "2024-08-20T22:56:46.544941+00:00"
    //       },
    //       {
    //         "title": "Intimacy",
    //         "createdAt": "2024-08-20T22:57:55.684517+00:00"
    //       },
    //       {
    //         "title": "New Skins",
    //         "createdAt": "2024-08-20T22:58:48.167828+00:00"
    //       },
    //       {
    //         "title": "I blossom still",
    //         "createdAt": "2024-08-30T23:27:33.433544+00:00"
    //       },
    //       {
    //         "title": "Adam and Eve",
    //         "createdAt": "2024-09-02T15:08:41.084683+00:00"
    //       },
    //       {
    //         "title": "The splice of Time",
    //         "createdAt": "2024-09-02T15:23:09.118101+00:00"
    //       },
    //       {
    //         "title": "Sacrifice",
    //         "createdAt": "2024-09-02T15:31:02.421361+00:00"
    //       },
    //       {
    //         "title": "Cain and Abel",
    //         "createdAt": "2024-09-02T15:37:17.502822+00:00"
    //       },
    //       {
    //         "title": "The Poet",
    //         "createdAt": "2024-09-02T15:46:58.967345+00:00"
    //       },
    //       {
    //         "title": "Think Proverb",
    //         "createdAt": "2024-09-02T17:04:47.256705+00:00"
    //       },
    //       {
    //         "title": "Conquistador",
    //         "createdAt": "2024-09-02T17:20:53.642978+00:00"
    //       },
    //       {
    //         "title": "Summer with you",
    //         "createdAt": "2024-09-02T17:26:08.852493+00:00"
    //       },
    //       {
    //         "title": "Skipping Medic",
    //         "createdAt": "2024-09-02T17:30:29.355528+00:00"
    //       },
    //       {
    //         "title": "The presence of God",
    //         "createdAt": "2024-09-02T17:38:37.042797+00:00"
    //       },
    //       {
    //         "title": "So fickle is the heart",
    //         "createdAt": "2024-09-02T17:49:19.603748+00:00"
    //       },
    //       {
    //         "title": "Ageless",
    //         "createdAt": "2024-09-03T15:08:20.222595+00:00"
    //       },
    //       {
    //         "title": "Deep Currents",
    //         "createdAt": "2024-09-03T15:11:43.773542+00:00"
    //       },
    //       {
    //         "title": "Iya Manu",
    //         "createdAt": "2024-09-03T15:16:33.111358+00:00"
    //       },
    //       {
    //         "title": "EDUNU (OLORI MI)",
    //         "createdAt": "2024-09-03T15:21:17.679737+00:00"
    //       },
    //       {
    //         "title": "Smooch of Darkness",
    //         "createdAt": "2024-09-03T15:35:07.32521+00:00"
    //       },
    //       {
    //         "title": "Excerpt from the weight of Shadows",
    //         "createdAt": "2024-09-03T15:41:27.498898+00:00"
    //       },
    //       {
    //         "title": "Nuke Dem",
    //         "createdAt": "2024-09-03T15:46:27.570826+00:00"
    //       },
    //       {
    //         "title": "Relationship",
    //         "createdAt": "2024-09-03T15:49:54.435089+00:00"
    //       },
    //       {
    //         "title": "Couples",
    //         "createdAt": "2024-09-03T15:55:37.847008+00:00"
    //       },
    //       {
    //         "title": "I don find Love ",
    //         "createdAt": "2024-09-03T16:07:53.939762+00:00"
    //       },
    //       {
    //         "title": "Wholeness",
    //         "createdAt": "2024-09-03T16:15:14.135869+00:00"
    //       },
    //       {
    //         "title": "Override",
    //         "createdAt": "2024-09-03T16:22:37.418341+00:00"
    //       },
    //       {
    //         "title": "Ghosts Hub",
    //         "createdAt": "2024-09-03T16:27:00.497085+00:00"
    //       },
    //       {
    //         "title": "Image of me",
    //         "createdAt": "2024-09-03T16:33:19.346162+00:00"
    //       },
    //       {
    //         "title": "Rest On",
    //         "createdAt": "2024-09-03T16:37:47.046355+00:00"
    //       },
    //       {
    //         "title": "The Heart wants what it wants",
    //         "createdAt": "2024-09-03T16:41:10.799239+00:00"
    //       },
    //       {
    //         "title": "The Jenga of Suspense ",
    //         "createdAt": "2024-09-03T16:44:12.335493+00:00"
    //       },
    //       {
    //         "title": "You can Abstain",
    //         "createdAt": "2024-09-03T16:46:02.256766+00:00"
    //       },
    //       {
    //         "title": "What's left of you",
    //         "createdAt": "2024-09-03T16:49:53.307191+00:00"
    //       },
    //       {
    //         "title": "Transfigured",
    //         "createdAt": "2024-09-07T21:55:30.289334+00:00"
    //       },
    //       {
    //         "title": "The Strike In Voltage",
    //         "createdAt": "2024-09-07T21:58:25.966024+00:00"
    //       },
    //       {
    //         "title": "Indestructible wealth",
    //         "createdAt": "2024-09-07T22:33:07.60234+00:00"
    //       },
    //       {
    //         "title": "Boss' Daughter",
    //         "createdAt": "2024-09-07T22:35:58.296652+00:00"
    //       },
    //       {
    //         "title": "All Shades of Surprise",
    //         "createdAt": "2024-09-07T22:41:59.962554+00:00"
    //       },
    //       {
    //         "title": "The Pistol of Triumph",
    //         "createdAt": "2024-09-07T22:56:46.349857+00:00"
    //       },
    //       {
    //         "title": "Skipping Breakfast",
    //         "createdAt": "2024-09-07T23:00:25.7583+00:00"
    //       },
    //       {
    //         "title": "Consummated",
    //         "createdAt": "2024-09-07T23:31:42.40013+00:00"
    //       },
    //       {
    //         "title": "Gorilla warfare",
    //         "createdAt": "2024-09-07T23:34:11.213223+00:00"
    //       },
    //       {
    //         "title": "Origins",
    //         "createdAt": "2024-09-07T23:36:32.497419+00:00"
    //       },
    //       {
    //         "title": "Drenched in you",
    //         "createdAt": "2024-09-07T23:42:41.273228+00:00"
    //       },
    //       {
    //         "title": "Mystical being",
    //         "createdAt": "2024-09-07T23:44:25.747462+00:00"
    //       },
    //       {
    //         "title": "Napkin Drops",
    //         "createdAt": "2024-09-07T23:46:20.108306+00:00"
    //       },
    //       {
    //         "title": "Solar System",
    //         "createdAt": "2024-09-07T23:48:23.486171+00:00"
    //       },
    //       {
    //         "title": "A Full Moon",
    //         "createdAt": "2024-09-07T23:50:51.198732+00:00"
    //       },
    //       {
    //         "title": "Some Misfits",
    //         "createdAt": "2024-09-08T08:04:10.489861+00:00"
    //       },
    //       {
    //         "title": "It Rained Last Night",
    //         "createdAt": "2024-09-08T09:37:24.635554+00:00"
    //       },
    //       {
    //         "title": "Oreofeoluwa",
    //         "createdAt": "2024-09-08T10:13:27.563183+00:00"
    //       },
    //       {
    //         "title": "Seven Words Each",
    //         "createdAt": "2024-09-08T10:20:09.453708+00:00"
    //       },
    //       {
    //         "title": "Poetry",
    //         "createdAt": "2024-09-08T10:29:38.202969+00:00"
    //       },
    //       {
    //         "title": "Phases Of Ectasy",
    //         "createdAt": "2024-09-08T10:35:09.572527+00:00"
    //       },
    //       {
    //         "title": "I Blossom Still",
    //         "createdAt": "2024-09-08T10:45:08.596474+00:00"
    //       },
    //       {
    //         "title": "Heavy Joy",
    //         "createdAt": "2024-09-08T10:55:51.610893+00:00"
    //       },
    //       {
    //         "title": "Worlds Within Worlds",
    //         "createdAt": "2024-09-08T10:59:41.351189+00:00"
    //       },
    //       {
    //         "title": "Colours",
    //         "createdAt": "2024-09-08T11:03:23.018362+00:00"
    //       },
    //       {
    //         "title": "Any Last Words",
    //         "createdAt": "2024-09-08T11:07:21.366232+00:00"
    //       },
    //       {
    //         "title": "The Poets Eyes",
    //         "createdAt": "2024-09-08T11:13:45.561143+00:00"
    //       },
    //       {
    //         "title": "Nigeria",
    //         "createdAt": "2024-09-08T11:16:31.505934+00:00"
    //       },
    //       {
    //         "title": "A Story",
    //         "createdAt": "2024-09-08T11:28:50.965657+00:00"
    //       },
    //       {
    //         "title": "Passing Thoughts",
    //         "createdAt": "2024-09-08T11:31:21.106946+00:00"
    //       }
    //     ]
    //   }

    //   // const dataTest = convertPoemsToObject(data)
    //   const whole = [...data["poems"], ...dataTwo["poems"]]
    // console.log(new Set(whole))

    
  }, [])

  const handleLastVisit = () => {
    dispatch(setLastVisited(url.pathname))
  }

 

  return (
    < div className= 'NavbarDiv'>
      <  div className='NavbarContainer' >
        <img src='/logo.svg' alt='logo' className='logo' />

        <div className="menuitems">
          <span onClick={() => navigate('/')} >Home</span>
          <span onClick={() => navigate('/poems')} >Poems</span>
          <span onClick={() => navigate('/haiku-wallpapers')} >Wallpapers</span>
          <span onClick={() => navigate('/contact')} >Contact Us</span>
          
        </div>

        {
            !currentUser? <div className="nav-buttons">
            <Link  onClick={handleLastVisit} href={'/login'} >
              <span className='login' >LOGIN</span>
            </Link>

            <Link  onClick={handleLastVisit} href={'/signup'} >
              <span className='sign-up' >SIGN UP</span>
            </Link>
            </div> : <div className='user-menu' >
              <div className="user-tag" onClick={() => setUserNavClick((prev) => !prev)} >
                <div className="user-icon">{currentUser?.fullName[0].toUpperCase()}</div>
              </div>

             { userNavClick &&  <div className="user-links" onClick={() => setUserNavClick(false)} >
                <Link href={'/dashboard'} style={{padding: '0', margin: '12px 0 15px'}} >
                  <span>Dashboard</span>
                </Link>
                <span onClick={signOutHandler} >Logout</span>
              </div>}
            </div>
        }
      </ div >
      <  div className='MobileContainer'>
      <img src='/logo.svg' alt='logo' className='logo' />
      <div className={navClick? 'hambuga spin': 'hambuga'} onClick={() => {setNavClick(!navClick)}}>
          <div className='ham dis'></div>
          <div className='ham spins'></div>
          <div className='ham spins-i'></div>
          <div className='ham dis'></div>
          
      </div>
      <div className={navClick? "mob-menu-div menu-show": "mob-menu-div "}>
          <div className="mob-menu-div-cont">
            <a href='/'>Home</a>
            <a href='/poems'>Poems</a>
            <a href='/haiku-wallpapers'>Wallpapers</a>
            <a href='/contact'>Contact Us</a>
            {
            !currentUser? <div className="nav-buttons"  >
            <Link onClick={handleLastVisit}  href={'/login'} >
              <span className='login' onClick={() => setNavClick(false)} >LOGIN</span>
            </Link>

            <Link onClick={handleLastVisit}  href={'/signup'} >
              <span className='sign-up' onClick={() => setNavClick(false)} >SIGN UP</span>
            </Link>
            </div> : < >
            <a href='/dashboard'>Dashboard</a>
            <a href='' onClick={signOutHandler} >Logout</a>

            </>
        }
          </div>
      </div>
      </  div >
      { paymentOverlay && <PaymentOverlay />}
    </ div  >
  )
}

export default Navbar