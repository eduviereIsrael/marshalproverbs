import React, { Suspense, lazy } from 'react';
import Navbar from '../Navbar';
import {GraphQLClient, gql} from 'graphql-request';
import { Footer } from '..';


const QUERY0 = gql `
{
  haikuWallpapers(first: 100) {
    id
    price
    theme
    wallpapers {
      id
      url
    }
  }

  poemsBatch1: poems(first: 100) {
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

  poemsBatch2: poems(first: 100, skip: 100) {
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

  
}
`;

const QUERY1 = gql `
{
  poems(first: 100) {
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

}
`;

const QUERY2 = gql `
{
  poems(first: 100, skip: 100) {
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

}
`;




const graphCms = new GraphQLClient("https://api-eu-west-2.hygraph.com/v2/clrduuykb2fc701wdf6w493dq/master")

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function getData() {
  await delay(200)
  const data = await graphCms.request(QUERY0);
  // const data1 = await graphCms.request(QUERY1);
  // const data2 = data1.poems.length === 100? [] : await graphCms.request(QUERY2)


    return {poems: [...data.poemsBatch1, ...data?.poemsBatch2], haikuWallpapers: [...data.haikuWallpapers]}

  // console.log(data)
  // return (data)
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
      <Footer />
    </div>
  );
};

