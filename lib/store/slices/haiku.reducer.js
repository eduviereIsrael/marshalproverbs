import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from 'reselect';

const INITIAL_STATE = {

    allHaiku: []
}


const haikuSlice = createSlice({
    name: 'haiku',
    initialState: INITIAL_STATE,
    reducers: {
        setHaiku: (state, action) => {
            state.allHaiku = action.payload
        }
    }
})

export const haikuReducer = haikuSlice.reducer;
export const {setHaiku} = haikuSlice.actions