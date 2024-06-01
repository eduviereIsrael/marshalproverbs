import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createSelector } from 'reselect';


const extractFormsFromPoems = (poemsListed) => {
    const formSet = new Set(poemsListed.map(poem => poem.form));
    const uniqueFormValues = Array.from(formSet);

    return uniqueFormValues
}

const getFilteredPoems = (poems, form) => {
    if(form === 'All'){
        return poems
    }

    const newPoems = poems.filter(poem => poem.form.toLowerCase() === form.toLowerCase())
    console.log("new Poems", newPoems)
    return newPoems
}



const INITIAL_STATE = {
    poemsListed : [],

    weeklyPoems : [
        { title: 'Melody of the Soul', subscriptionPlan: 'Gold' },
        { title: 'Echoes of Tomorrow', subscriptionPlan: 'Platinum' },
        { title: 'Dance with Destiny', subscriptionPlan: 'Gold' },
        { title: 'Whispers in the Night', subscriptionPlan: 'Supernova' },
        // { title: 'Melody of the Soul', subscriptionPlan: 'Gold' }
    ],

    selectedPoemCategory: 'All',

    filteredPoems : []
}

const poemSlice = createSlice({
    name: 'poem',
    initialState: INITIAL_STATE,
    reducers: {
        filterPoems(state, action){
            state.selectedPoemCategory = action.payload
            state.filteredPoems = getFilteredPoems(state.poemsListed, action.payload)
        },
        setAllPoems(state, action){
            state.poemsListed = action.payload
        }
    }
})

export const { filterPoems, setAllPoems } = poemSlice.actions
export const poemsReducer = poemSlice.reducer




//Poem Selectors
export const selectAllPoemsReducer = (state) => state.poems.poemsListed
export const selectFilteredPoems = (state) => state.poems.filteredPoems
export const allPoems = (state) => state.poems

export const selectPoemForms = createSelector(
    [selectAllPoemsReducer],
    (poemsListed) => extractFormsFromPoems(poemsListed)
)

export const poemCategorySelector = createSelector(
    [allPoems],
    (poems) => poems.selectedPoemCategory
)


