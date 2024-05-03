import { configureStore } from '@reduxjs/toolkit'
import { poemsReducer } from './slices/poems.reducer'

export const makeStore = () => {
  return configureStore({
    reducer: {
        poems: poemsReducer,
    },
  })
}