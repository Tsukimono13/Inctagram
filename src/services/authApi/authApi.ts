import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl:'https://inctagram-api-git-main-shuliakleonid.vercel.app/api/auth/' }),
    endpoints: (builder) => ({
        signIn: builder.mutation<any, { email: string; password: string }>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useSignInMutation } = authApi;


