// import React, { useEffect } from 'react'
import HaikuContainer from '@/components/haikuContainer';
import {GraphQLClient, gql} from 'graphql-request';

// import { useEffect } from "react";




// const 

const QUERY = gql `
{
  haikuWallpapers {
    theme
    id
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
const HaikuPage = async() => {

    const haikuWallpapers = await getData() 
    
  
    return (
      <div className='haiku-page' >
          <div className="container">
              <h1>Haiku Wallpapers</h1>

              <HaikuContainer haikuWallpapers={haikuWallpapers} />
            
          </div>
      </div>
    )
}

export default HaikuPage