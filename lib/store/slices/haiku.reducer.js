import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from 'reselect';

const INITIAL_STATE = {

    allHaiku: [],
    purchasedHaiku: []

}

const getPurchasedHaikus = (haikus, purchasedHaikus) => {
    return haikus.filter(haiku => purchasedHaikus.includes(haiku.id));
  };

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
    }
})

export const haikuReducer = haikuSlice.reducer;
export const {setHaiku, setPurchasedHaikus, clearPurchasedHaiku} = haikuSlice.actions


export const purchasedHaikuSelector = (state) => state.haiku.purchasedHaiku