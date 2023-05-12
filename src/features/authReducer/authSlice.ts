import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "@/services/authApi/authApi";


export type AuthInitStateType = {
    isSignedIn:boolean
    user:UserType
}


const initialState:AuthInitStateType = {
    user:{},
    isSignedIn:false
}


const slice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setIsLoggedIn:(state, action:PayloadAction<{isSignedIn:boolean}>) =>{
            state.isSignedIn = action.payload.isSignedIn
        },
        setUser:(state, action:PayloadAction<{user:UserType}>) => {
            state.user = action.payload.user
        }
    }
})


export const authReducer = slice.reducer

export const authActions = slice.actions