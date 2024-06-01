import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createSelector } from 'reselect';

import {GraphQLClient, gql} from 'graphql-request';


const INITIAL_STATE = {

    allHaiku: [],
    purchasedHaiku: [],
    fetchHaikuLoading: false

}

const getPurchasedHaikus = (haikus, purchasedHaikus) => {
    return haikus.filter(haiku => purchasedHaikus.includes(haiku.id));
  };

export const fetchPurchasedHaikus = createAsyncThunk(
    'haiku/fetchPurchasedHaikus',

    async(paidWallpapers, {rejectWithValue, dispatch}) => {
        // console.log(paidWallpapers)
        try{

            const QUERY = gql `
            {
              haikuWallpapers {
                theme
                wallpapers {
                  id
                  url
                }
                price
                id
              }
            }
            `;
            
            const graphCms = new GraphQLClient("https://api-eu-west-2.hygraph.com/v2/clrduuykb2fc701wdf6w493dq/master")
            const data = await graphCms.request(QUERY);
            if(data?.haikuWallpapers){
                // console.log(data.haikuWallpapers)
                return getPurchasedHaikus(data.haikuWallpapers, paidWallpapers)
            }
        } catch(error){
            return rejectWithValue("error getting purchased wallpapers")
        }
    }

)

const haikuSlice = createSlice({
    name: 'haiku',
    initialState: INITIAL_STATE,
    reducers: {
        setHaiku: (state, action) => {
            state.allHaiku = action.payload
        },
        clearPurchasedHaiku: (state, action) => {
            state.purchasedHaiku = []
        },
        setPurchasedHaikus: (state, action) => {
            state.purchasedHaiku = getPurchasedHaikus(state.allHaiku, action.payload)
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchPurchasedHaikus.fulfilled, (state, action) => {
            state.purchasedHaiku = action.payload
            state.fetchHaikuLoading = false;
        })
        .addCase(fetchPurchasedHaikus.rejected, (state, action) => {
            state.fetchHaikuLoading = false;
        })
        .addCase(fetchPurchasedHaikus.pending, (state, action) => {
            state.fetchHaikuLoading = true;
        })
    }
})

export const haikuReducer = haikuSlice.reducer;
export const {setHaiku, setPurchasedHaikus, clearPurchasedHaiku} = haikuSlice.actions



//SELECTORS
export const purchasedHaikuSelector = (state) => state.haiku.purchasedHaiku
export const allHaikuSelector = (state) => state.haiku.allHaiku
export const haikuIsLoadingSelector = (state) => state.haiku.fetchHaikuLoading