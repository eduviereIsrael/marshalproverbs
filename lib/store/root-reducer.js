import { combineReducers } from '@reduxjs/toolkit';
import { poemsReducer } from './slices/poems.reducer'
import { haikuReducer } from './slices/haiku.reducer'
import { userReducer } from './slices/user.reducer'
import { cartReducer } from './slices/cart.reducer'

export const rootReducer = combineReducers({
    poems: poemsReducer,
    user: userReducer,
    haiku: haikuReducer,
    cart: cartReducer
})