import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export type RecoveryPasswordType={
    email: string
    recaptcha: string
}
export type RegistrationType = {
    userName: string
    email: string
    password: string
}

export type LoginType = Omit<RegistrationType, 'userName'>

type LoginResponseType = {
    accessToken: string
}

export type UserType = {
    userId: number
    userName: string
    email: string
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'https://inctagram-api-git-main-shuliakleonid.vercel.app/api/',
            prepareHeaders:(headers) => {
                const token = localStorage.getItem('token')

                if(token) return headers.set('Authorization', `Bearer ${token}`)

                return headers
            }
        }
    ),
    endpoints: (builder) => ({
        signIn: builder.mutation<LoginResponseType, LoginType>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body: body,
            }),
        }),
        LogOut: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
        }),
        registration: builder.mutation<any, RegistrationType>({
            query: (body: RegistrationType) => ({
                url: 'auth/registration',
                method: 'POST',
                body: body
            })
        }),
        forgotPassword: builder.mutation<any, RecoveryPasswordType>({
            query: (body: RecoveryPasswordType) => ({
                url: 'auth/password-recovery',
                method: 'POST',
                body: body
            })
        }),
        user:builder.query({
            query:() => ({
                url:'auth/me',
                method:'GET'
            })
        })
    }),
});

export const {useSignInMutation, useLogOutMutation, useRegistrationMutation,useUserQuery,useForgotPasswordMutation} = authApi;


