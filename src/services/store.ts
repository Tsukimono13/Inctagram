import {AnyAction, combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "@/services/authApi/authApi";
import {authReducer} from "@/features/authReducer/authSlice";
import {profileApi} from "@/services/profileApi/profileApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [profileApi.reducerPath]:profileApi.reducer,
    authReducer:authReducer

})


export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(profileApi.middleware)
})


export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>

setupListeners(store.dispatch)