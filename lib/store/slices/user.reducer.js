import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createSelector } from 'reselect';
import { createAuthUserWithEmailAndPassword, updateUserSubscription, updateUserProduct, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signOutUser } from "@/lib/firebase/firebase.utils";
import { paymentVerified } from "./cart.reducer";
import { setPurchasedHaikus, clearPurchasedHaiku } from "./haiku.reducer";
import axios from "axios";


//user async thunks
export const logInUser = createAsyncThunk(
    'user/login',
    async(user, {dispatch, rejectWithValue}) => {
        // console.log(user)
       try{ 
            // const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            const url = 'https://marshalpayment.netlify.app/api/fetchsub';
            // const url = 'http://localhost:3001/fetchsub';

            if(user){

                const userSnapshot = await createUserDocumentFromAuth(user)
                if(userSnapshot){
                    // console.log(userSnapshot)
                    if(userSnapshot?.purchases?.haikuWallpapers?.length > 0){
                        dispatch(setPurchasedHaikus(userSnapshot.purchases.haikuWallpapers))
                    }
                    if(userSnapshot?.sub?.id != null && userSnapshot){

                        try{
                            console.log("checking subscription", userSnapshot.sub.id)
                            const response = await axios.post(url, {
                                "id": `${userSnapshot.sub.id}`
                            })
                            // console.log(response)
            
                            if(response.data.data.status === "cancelled"){
                                const newSnapshot = {...userSnapshot, sub: {
                                    plan: 'Starter',
                                    id: null
                                  },}

                                  await updateUserSubscription(newSnapshot.id, "Starter", null, null, null)
            
                                  return newSnapshot
                            }

                        } catch(error){
                            return userSnapshot
                        }
                        // console.log(response.data)
                        // dispatch(paymentVerified())
                    }
                    // sessionStorage.setItem
                    return userSnapshot
                } else {
                    dispatch(clearPurchasedHaiku())
                    return rejectWithValue("Failed to sign in")
                }
    
            } else{
                return rejectWithValue("Failed to sign in")
            }

        }catch(error){
            dispatch(clearPurchasedHaiku())
            return rejectWithValue(error.message)
        }
       
    }
)

export const signInUser = createAsyncThunk(
    'user/signIn',
    async({email, password}, {dispatch, rejectWithValue}) => {
       try{ 
            const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            dispatch(logInUser(user))
            return {}
        }catch(error){
            dispatch(clearPurchasedHaiku())
            return rejectWithValue(error.message)
        }
       
    }
)

export const checkSub = createAsyncThunk(
    'user/checksub',
    async({userId ,id}, {dispatch, rejectWithValue}) => {
       try{ 
        console.log("checking subscription", id)

            const url = 'https://marshalpayment.netlify.app/api/fetchsub';
            // const url = 'http://localhost:3001/fetchsub';
            const response = await axios.post(url, {
                "id": `${id}`
            })
            // console.log(response)

            if(response?.data?.data?.status === "cancelled"){
                const sub = {
                    plan: 'Starter',
                    id: null
                  }

                await updateUserSubscription(userId, "Starter", null, null, null)

                  return {}
            }

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

            dispatch(logInUser(user))

            return {}
        } catch(error){
            dispatch(clearPurchasedHaiku())
            return rejectWithValue(error.message)
        }
        
    }
)

export const signOut = createAsyncThunk(
    'user/signOut',
    async(_, {dispatch}) => {
        await signOutUser()
        dispatch(clearPurchasedHaiku())
        return null
       
    }
)

export const signInAtFirstRender = createAsyncThunk(
    'user/autosignin',
    async(_,{rejectWithValue, dispatch}) => {
        try{
            const user = await getCurrentUser();
            if(user){

                dispatch(logInUser(user))
                return {}
            } else {
                return rejectWithValue("")
            }

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


const getDateThreeDaysAhead = () => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toISOString().split('T')[0];
  };

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
    clearDate: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.clearDate = getDateThreeDaysAhead()

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
    //    builder.addCase(signInUser.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.currentUser = action.payload;
    //    })
       builder.addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
       }),
       builder.addCase(signInAtFirstRender.pending, (state, action) => {
        state.isLoading = true;
       }),
    //    builder.addCase(signInAtFirstRender.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.currentUser = action.payload;
    //    })
       builder.addCase(signInAtFirstRender.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
       }),
       builder.addCase(signUpUser.pending, (state, action) => {
        state.isLoading = true;
        // console.log('we got to extra reducers')
       }),
    //    builder.addCase(signUpUser.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.currentUser = action.payload;
    //     // console.log('we signup', action.payload)

    //    })
       builder.addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // console.log('we failed to signup')

       }),
       builder.addCase(signOut.fulfilled, (state, action) => {
        state.currentUser = null;
       }),
       builder.addCase(logInUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.clearDate = getDateThreeDaysAhead()
        state.isLoading = false;
       }),
       builder.addCase(logInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // console.log('we failed to signup')

       })
       
    }
})


export const userReducer = userSlice.reducer;
export const {setUserError, signInSuccess} = userSlice.actions;

//User selectors
const selectUser = (state) => state.user

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)

export const selectClearDate = createSelector(
    [selectUser],
    (user) => user.clearDate
)

export const selectUserIsLoading = createSelector(
    [selectUser],
    (user) => user.isLoading
)

export const selectUserError = createSelector(
    [selectUser],
    (user) => user.error
)
