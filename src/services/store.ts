import {AnyAction, combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "@/services/authApi/authApi";
import {authReducer} from "@/features/authReducer/authSlice";
import {postReducer} from "@/features/postReducer/postSlice";
import {postApi} from "@/services/postsApi/postApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [postApi.reducerPath]:postApi.reducer,
    authReducer:authReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
            .concat(postApi.middleware)
})


export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>

setupListeners(store.dispatch)