import React, { Suspense, lazy } from 'react';
import Navbar from '../Navbar';
import {GraphQLClient, gql} from 'graphql-request';


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

const graphCms = new GraphQLClient("https://api-eu-west-2.hygraph.com/v2/clrduuykb2fc701wdf6w493dq/master")


async function getData() {
  const data = await graphCms.request(QUERY);
  if(data?.haikuWallpapers){
    return { haikuWallpapers: data.haikuWallpapers, poems: data.poems, data: data}
  }

  // console.error("Error fetching Haiku Wallpapers")

}

export default async function App ({ children })  {

  const data = await getData()

  return (
    <div>
      <Navbar data={data} />
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
};

