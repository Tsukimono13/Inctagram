import {RootStateType} from "@/services/store";


export const signedIn = (state:RootStateType) => state.authReducer.isSignedIn
export const signedUp = (state:RootStateType) => state.authReducer.isSignedUp

export const userData = (state:RootStateType) => state.authReducer.user