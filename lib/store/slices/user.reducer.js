import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createSelector } from 'reselect';
import { createAuthUserWithEmailAndPassword, updateUserProduct, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signOutUser } from "@/lib/firebase/firebase.utils";
import { paymentVerified } from "./cart.reducer";


//user async thunks
export const signInUser = createAsyncThunk(
    'user/signIn',
    async({email, password}, {dispatch, rejectWithValue}) => {
       try{ const {user} = await signInAuthUserWithEmailAndPassword(email, password)
        const userSnapshot = await createUserDocumentFromAuth(user)
        // console.log(userAuth)

            return userSnapshot
        }catch(error){
            return rejectWithValue(error.message)
        }
       
    }
)


export const signUpUser = createAsyncThunk(
    'user/signUp',
    async({email, password, newUser}, {dispatch, rejectWithValue}) => {
        try{
            // console.log(email, password, newUser)
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            const userSnapshot = await createUserDocumentFromAuth(user, newUser)
            // console.log('we got here', userAuth)
            // return {id: userSnapshot.id, ...userSnapshot.data()}
            console.log("error so we skip, no?")
            return userSnapshot
        } catch(error){
            return rejectWithValue(error.message)
        }
        
    }
)

export const signOut = createAsyncThunk(
    'user/signOut',
    async(_, {dispatch}) => {
        await signOutUser()
        return null
       
    }
)

export const signInAtFirstRender = createAsyncThunk(
    'user/autosignin',
    async(_,{rejectWithValue}) => {
        try{
            const user = await getCurrentUser();
            const userSnapshot = await createUserDocumentFromAuth(user)
            return userSnapshot
        } catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const updateUserPurchase = createAsyncThunk(
    'user/updatepurchase',
    async({userId, category, productId}, {rejectWithValue, dispatch}) => {
        try{
            const response = await updateUserProduct(userId, category, productId)
            dispatch(paymentVerified())
            dispatch(signInAtFirstRender())
            return response
        } catch(error){
            return rejectWithValue(error.message)
        }
    }
)

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        signInFailed: (state, action) => {
            state.currentUser = null;
            state.error = action.payload;
        },
        setUserError: (state, action) => {
            state.error = action.payload;
        },
        

    },

    extraReducers:(builder) => {
       builder.addCase(signInUser.pending, (state, action) => {
        state.isLoading = true;
       }),
       builder.addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
       })
       builder.addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
       }),
       builder.addCase(signInAtFirstRender.pending, (state, action) => {
        state.isLoading = true;
       }),
       builder.addCase(signInAtFirstRender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
       })
       builder.addCase(signInAtFirstRender.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
       }),
       builder.addCase(signUpUser.pending, (state, action) => {
        state.isLoading = true;
        // console.log('we got to extra reducers')
       }),
       builder.addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        // console.log('we signup', action.payload)

       })
       builder.addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // console.log('we failed to signup')

       }),
       builder.addCase(signOut.fulfilled, (state, action) => {
        state.currentUser = null;
       })
    }
})


export const userReducer = userSlice.reducer;
export const {setUserError} = userSlice.actions;

//User selectors
const selectUser = (state) => state.user

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)

export const selectUserIsLoading = createSelector(
    [selectUser],
    (user) => user.isLoading
)

export const selectUserError = createSelector(
    [selectUser],
    (user) => user.error
)
