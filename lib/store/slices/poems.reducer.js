import { createSlice } from "@reduxjs/toolkit"
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
    return newPoems
}



const INITIAL_STATE = {
    poemsListed : [
        { "title": "Melody of the Soul", "subscriptionPlan": "Gold", "form": "Cinqauin" },
        { "title": "Echoes of Tomorrow", "subscriptionPlan": "Platinum", "form": "Free Verse" },
        { "title": "Dance with Destiny", "subscriptionPlan": "Gold", "form": "Lipogram" },
        { "title": "Whispers in the Night", "subscriptionPlan": "Supernova", "form": "Tanka" },
        { "title": "Melody of the Soul", "subscriptionPlan": "Gold", "form": "Mashal" },
        { "title": "Echoes of Tomorrow", "subscriptionPlan": "Platinum", "form": "Conceit" },
        { "title": "Dance with Destiny", "subscriptionPlan": "Gold", "form": "Limerick" },
        { "title": "Whispers in the Night", "subscriptionPlan": "Supernova", "form": "Free Verse" },
        { "title": "Melody of the Soul", "subscriptionPlan": "Gold", "form": "Lipogram" },
        { "title": "Echoes of Tomorrow", "subscriptionPlan": "Platinum", "form": "Cinqauin" },
        { "title": "Dance with Destiny", "subscriptionPlan": "Gold", "form": "Conceit" },
        { "title": "Whispers in the Night", "subscriptionPlan": "Supernova", "form": "Limerick" }
    ],

    weeklyPoems : [
        { title: 'Melody of the Soul', subscriptionPlan: 'Gold' },
        { title: 'Echoes of Tomorrow', subscriptionPlan: 'Platinum' },
        { title: 'Dance with Destiny', subscriptionPlan: 'Gold' },
        { title: 'Whispers in the Night', subscriptionPlan: 'Supernova' },
        // { title: 'Melody of the Soul', subscriptionPlan: 'Gold' }
    ],

    filteredPoems : []
}

const poemSlice = createSlice({
    name: 'poem',
    initialState: INITIAL_STATE,
    reducers: {
        filterPoems(state, action){
            state.filteredPoems = getFilteredPoems(state.poemsListed, action.payload)
        }
    }
})

export const { filterPoems } = poemSlice.actions
export const poemsReducer = poemSlice.reducer




//Poem Selectors
export const selectAllPoemsReducer = (state) => state.poems.poemsListed
export const selectFilteredPoems = (state) => state.poems.filteredPoems

export const selectPoemForms = createSelector(
    [selectAllPoemsReducer],
    (poemsListed) => extractFormsFromPoems(poemsListed)
)


