
import { TopHaiku, WeeklyPoems } from "@/components";
import { Inter } from "next/font/google";
import {GraphQLClient, gql} from 'graphql-request';




// const 

const QUERY = gql `
{
  haikuWallpapers {
    theme
    wallpapers {
      id
      url
    }
    price
  }
}
`;

const graphCms = new GraphQLClient("https://api-eu-west-2.hygraph.com/v2/clrduuykb2fc701wdf6w493dq/master")

async function getData() {
  const data = await graphCms.request(QUERY);
  if(data?.haikuWallpapers){
    return data.haikuWallpapers
  }

  console.error("Error fetching Haiku Wallpapers")

}

export default async function Home() {

  const haikuWallpapers = await getData()

  // console.log(haikuWallpapers[0].wallpapers)
  


  return (
    <main >
      <div className="hero " >
        <div className="container" >

          <div className="intro-all" >
            <h1>Unveiling the Tapestry of Emotions through Poetic Masterpieces</h1>

            <p>Immerse yourself in a symphony of verses as we present a curated collection of poems that speak to the depths of the human experience.</p>
          </div>
        </div>

        <img src="/hero-bg.webp" className="desktop" />
        <img src="/mobile-hero.webp" className="mobile" />
      </div>
      <WeeklyPoems/>
      <TopHaiku haikuWallpapers={haikuWallpapers} />
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

