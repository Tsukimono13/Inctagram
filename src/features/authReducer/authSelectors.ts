import {RootStateType} from "@/services/store";


export const signedIn = (state:RootStateType) => state.authReducer.isSignedIn

export const userData = (state:RootStateType) => state.authReducer.user