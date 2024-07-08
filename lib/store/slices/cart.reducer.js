import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createSelector } from 'reselect';
import { updateUserSub, signInAtFirstRender } from "./user.reducer";
import { updateUserSubscription } from "@/lib/firebase/firebase.utils";
import axios from "axios";

const INITIAL_STATE = {
    cartDetails: {
        image: '',
        email: "",
        product: "",
        amount: 0,
        paymentId: '',
        category: null,
        productId: null,
    },
    paymentIsLoading: false,
    error: null,
    errorLink: '',
    paymentStatus: "notStarted",
    paymentOverlay: false,
    paymentLink: null,
    verifyIsLoading: false,
    paymentProcessing: "notstarted"
}


//THUNKS
export const getPaymentLink = createAsyncThunk(
    'cart/getpayment',
    async(cartDetails, {rejectWithValue}) => {
        const url = 'https://marshalpayment.netlify.app/api/acceptpayment'; //live
        // const url = 'http://localhost:8888/api/acceptpayment'; //local
        // console.log(cartDetails)

        const {email, amount, product, paymentId} = cartDetails;
        const bodyData = {email, amount, product, paymentId}

        try{
            const data = await axios.post(url, bodyData)
            const link = (JSON.parse(data.data)).data.authorization_url
            // console.log(link)
            return link
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const verifypayments = createAsyncThunk(
    'cart/verifypayment',
    async(ref, {rejectWithValue, dispatch}) => {
        const url = `https://marshalpayment.netlify.app/api/verify?reference=${ref}`; //live
        // const url = `http://localhost:8888/api/verify?reference=${ref}`; //local
        try{const {data} = await axios.get(url)
        if (JSON.parse(data).data.status === "success"){
            return (JSON.parse(data).data)
        } else {
            return rejectWithValue("Error while veryfying payment")
        }} catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const subscribeUser = createAsyncThunk(
    'cart/subscribeuser',
    async(details, {rejectWithValue, dispatch}) => {
        try{
            const { email, planCode, productId, userId } = details;
            const bodyData = { 
                customerId : email,
                plan: planCode
             }
            const {data} = await axios.post('https://marshalpayment.netlify.app/api/subscribe', bodyData) //live
            // const {data} = await axios.post('http://localhost:8888/api/subscribe', bodyData) //live
            console.log(data)
            if (data.data.status === "active"){
                // console.log("we ran")
                const id = data.data.id
                const email_token = data.data.email_token
                const subCode = data.data.subscription_code
                const response = await updateUserSubscription(userId, productId, id, email_token, subCode)
                dispatch(paymentVerified())
                dispatch(signInAtFirstRender())
            }

            return data.data.id
        } catch(error){
            return rejectWithValue(error.message)
        }
    }
)



//SLICE
const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        setCartDetails: (state, action) => {
            state.cartDetails = action.payload;
            state.paymentOverlay = true;
        },
        setCartError: (state, action) => {
            state.error = action.payload.error;
            state.errorLink = action.payload.link;
            state.paymentOverlay = true;
        },
        clearCart: (state, action) => {
            state.cartDetails = {
                image: '',
                email: "",
                product: "",
                amount: 0,
                paymentId: '',
                category: null,
                productId: null
            }
            state.paymentIsLoading = false;
            state.error = null;
            state.errorLink = ''
            // state.paymentStatus = false;
            state.paymentOverlay = false;
            state.paymentLink = null;
        },
        clearPaymentLink: (state, action) => {
            state.paymentLink = null
        },
        clearOverlay: (state, action) => {
            state.paymentOverlay = false
        },
        paymentVerified: (state, action) => {
            state.verifyIsLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPaymentLink.pending, (state, action) => {
            state.paymentIsLoading = true;
        })
        .addCase(getPaymentLink.fulfilled, (state, action) => {
            state.paymentIsLoading = false;
            state.paymentStatus = "started";
            state.paymentLink = action.payload;
            // state.paymentOverlay = false;
        })
        .addCase(getPaymentLink.rejected, (state, action) => {
            state.paymentIsLoading = false;
            // state.error = action.payload;
        })
        .addCase(verifypayments.pending, (state, action) => {
            //from here
            state.verifyIsLoading = true
        })
        .addCase(verifypayments.rejected, (state, action) => {
            state.verifyIsLoading = false
            state.paymentStatus = "failed"
        })
        .addCase(verifypayments.fulfilled, (state, action) => {
            state.paymentStatus = "completed"
        })
    }
})

export const { setCartDetails, setCartError, clearCart, clearOverlay, paymentVerified } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;





//SELECTORS
const selectCart = (state) => state.cart;

export const selectCartError = createSelector(
    [selectCart],
    (cart) => cart.error
)

export const selectCartErrorLink = createSelector(
    [selectCart],
    (cart) => cart.errorLink
)

export const selectPaymentStatus = createSelector(
    [selectCart],
    (cart) => cart.paymentStatus
)

export const selectCartIsLoading = createSelector(
    [selectCart],
    (cart) => cart.paymentIsLoading
)

export const selectPaymentOverlay = createSelector(
    [selectCart],
    (cart) => cart.paymentOverlay
)

export const selectCartDetails = createSelector(
    [selectCart],
    (cart) => cart.cartDetails
)

export const selectPaymentLink = createSelector(
    [selectCart],
    (cart) => cart.paymentLink
)

export const selectverifyIsLoading = createSelector(
    [selectCart],
    (cart) => cart.verifyIsLoading
)


// a new value to save the payment url, a createSync function to make the api call and store the payment url
// open the url on a new tab, a state to monitor if a payment has started or not, a state to monitor the stage of the payment