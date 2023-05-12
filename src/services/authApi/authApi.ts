import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export type LoginFormType = {
    email:string
    password:string
}

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
    baseQuery: fetchBaseQuery({ baseUrl:'https://inctagram-api-git-main-shuliakleonid.vercel.app/api/auth/' }),
    endpoints: (builder) => ({
        signIn: builder.mutation<LoginResponseType,LoginFormType>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { useSignInMutation } = authApi;


