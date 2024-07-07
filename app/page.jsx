
import { Plans, PoemsForm, PoemsListed, TopHaiku, WeeklyPoems } from "@/components";
import { Inter } from "next/font/google";
import {GraphQLClient, gql} from 'graphql-request';
import { useDispatch } from 'react-redux'

// import { useEffect } from "react";




// const 

const QUERY = gql `
{
  poems {
    form
    id
    title
    subscriptionPlan
    poemFile {
      id
      url
    }
  }
  haikuWallpapers {
    id
    price
    theme
    wallpapers {
      id
      url
    }
  }
}
`;



const QUERYPOEM = gql `
{
    poems {
        id
        title
        subscriptionPlan
        price
        poemFile {
          id
          url
        }
      }
}
`;

const graphCms = new GraphQLClient("https://api-eu-west-2.hygraph.com/v2/clrduuykb2fc701wdf6w493dq/master")

async function getData() {
  const data = await graphCms.request(QUERY);
  if(data?.haikuWallpapers){
    return { haikuWallpapers: data.haikuWallpapers, poems: data.poems, data: data}
  }

  // console.error("Error fetching Haiku Wallpapers")

}


async function getPoemData() {
  const data = await graphCms.request(QUERYPOEM);
  if(data?.poems){
    return data
  }

  // console.error("Error fetching Haiku Wallpapers")

}
export default async function Home() {

  const {haikuWallpapers, data, poems} = await getData()
  // const poems = getPoemData()



  // useEffect(() => {
  // }, [])
  // console.log(haikuWallpapers[0].wallpapers)
  


  return (
    <main >
      <div className="hero " >
        <div className="container" >

          <div className="intro-all" >
            <h1>Unveiling the Tapestry of Emotions through Poetic Masterpieces</h1>

            <p>Immerse yourself in a symphony of verses as we present a curated collection of poems that speak to the depths of the human experience.</p>
          </div>
          {/* <div></div> */}
        </div>
        <img src="/hero-bg.webp" className="desktop" />
        <img src="/mobile-hero.webp" className="mobile" />

      </div>
      <WeeklyPoems poemsIndex = {poems} />
      <TopHaiku haikuWallpapers={haikuWallpapers} />
      <PoemsListed poemsIndex = {poems}  />
      <PoemsForm />
      <Plans/>
    </main>
  );
}




// export async function getStaticProps(){

//   const data = await graphCms.request(QUERY);

//   // console.log(dataSanity)

//   return {
//     // props: {startUpData: [...data.startUpDataAll, ...dataSanity], spotlight: spotlight.startUpDataAll[0]},
//     props: {wallpapers: data.haikuWallpapers},
//     revalidate: 10,
//   }
// }

