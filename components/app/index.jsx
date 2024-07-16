import React, { Suspense, lazy } from 'react';
import Navbar from '../Navbar';
import {GraphQLClient, gql} from 'graphql-request';
import { Footer } from '..';


const QUERY = gql `
{
  poems(first: 110) {
    form
    id
    title
    subscriptionPlan
    poemFile {
      id
      url
    }
    poetsNote
  }
  haikuWallpapers(first: 110) {
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
      {/* <Footer /> */}
    </div>
  );
};

