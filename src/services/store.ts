import {AnyAction, combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "@/services/authApi/authApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>

setupListeners(store.dispatch)