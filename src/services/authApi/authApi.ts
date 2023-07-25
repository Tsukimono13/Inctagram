import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {settings} from "@/settings";
import {
    LoginResponseType,
    LoginType,
    NewPasswordType, RecoveryPasswordType,
    RegistrationConfirmation,
    RegistrationType, RequestBodyType, ResponseUploadAvatar, UserProfileType, UserType
} from "@/services/authApi/types";



export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes:["userProfile"],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: settings.baseUrl,
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
        registrationConfirmation: builder.mutation<any,RegistrationConfirmation>({
            query: (body:RegistrationConfirmation) => ({
                url:'auth/registration-confirmation',
                method:'POST',
                body
            })

        }),
        forgotPassword: builder.mutation<any, RecoveryPasswordType>({
            query: (body: RecoveryPasswordType) => ({
                url: 'auth/password-recovery',
                method: 'POST',
                body: body
            })
        }),
        createNewPassword: builder.mutation<any, NewPasswordType>({
            query: (body: NewPasswordType) => ({
                url: 'auth/new-password',
                method: 'POST',
                body: body
            })
        }),
        checkRecoveryCode: builder.mutation<any, {recoveryCode:string}>({
            query: (body: NewPasswordType) => ({
                url: 'auth/check-recovery-code',
                method: 'POST',
                body: body
            })
        }),
        user:builder.query<UserType, void>({
            query:() => ({
                url:'auth/me',
                method:'GET'
            })
        }),
        getProfile:builder.query<UserProfileType,null>({
            query:()=>({
                url:'users/profile',
            }),
            providesTags: ['userProfile'],
        }),
        updateProfile:builder.mutation<UserProfileType,RequestBodyType>({
            query:(body)=>({
                url:'users/profile',
                method:'PUT',
                body
            })
        }),
        uploadAvatar: builder.mutation<ResponseUploadAvatar, FormData>({
            query: (body: FormData) => ({
                url: 'users/profile/avatar',
                method: 'POST',
                body: body
            }),
            invalidatesTags:[{type:'userProfile'}]
        }),
        deleteAvatar: builder.mutation({
            query: () => ({
                url: 'users/profile/avatar',
                method: 'DELETE',

            })
        })

    }),
});

export const {useUploadAvatarMutation,useSignInMutation,useUpdateProfileMutation,
    useLogOutMutation, useRegistrationMutation, useUserQuery,useGetProfileQuery,
    useForgotPasswordMutation,useCreateNewPasswordMutation,
    useCheckRecoveryCodeMutation,useRegistrationConfirmationMutation,useDeleteAvatarMutation} = authApi;


