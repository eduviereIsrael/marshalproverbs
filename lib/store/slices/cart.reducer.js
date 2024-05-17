import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from 'reselect';

const INITIAL_STATE = {
    cartDetails: {
        image: '',
        email: "",
        product: "",
        amount: 0,
        paymentId: ''
    },
    isLoading: false,
    error: null,
    paymentStatus: false,
    paymentOverlay: false
}


const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        setCartDetails: (state, action) => {
            state.cartDetails = action.payload;
            state.isLoading = true;
            state.paymentStatus = true;
            state.paymentOverlay = true;
        },
        setCartError: (state, action) => {
            state.error = action.payload;
            state.paymentOverlay = true;
            state.paymentStatus = true
        },
        clearCart: (state, action) => {
            state.cartDetails = {
                image: '',
                email: "",
                product: "",
                amount: 0,
                paymentId: ''
            }
            state.isLoading = false;
            state.error = null;
            state.paymentStatus = false;
            state.paymentOverlay = false;
        }
    }
})

export const { setCartDetails, setCartError, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

const selectCart = (state) => state.cart;

export const selectCartError = createSelector(
    [selectCart],
    (cart) => cart.error
)

export const selectPaymentStatus = createSelector(
    [selectCart],
    (cart) => cart.paymentStatus
)

export const selectCartIsLoading = createSelector(
    [selectCart],
    (cart) => cart.isLoading
)

export const selectPaymentOverlay = createSelector(
    [selectCart],
    (cart) => cart.paymentOverlay
)

export const selectCartDetails = createSelector(
    [selectCart],
    (cart) => cart.cartDetails
)