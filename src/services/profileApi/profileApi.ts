import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {settings} from "@/settings";

type AvatarType={
  url: string
  width: number
  height: number
  fileSize: number
}
export type ResponseUploadAvatar={
  avatars:AvatarType[]
}
export type ResponseUserProfile= {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  dateOfBirth: string
  aboutMe: string
  avatars: AvatarType[]
}
export const profileApi = createApi({
  reducerPath: 'profileApi',
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
    getUserProfile: builder.query<ResponseUserProfile, void>({
      query: () => ({
        url: 'users/profile',
        method: 'GET',

      })
    }),
    uploadAvatar: builder.mutation<ResponseUploadAvatar, FormData>({
      query: (body: FormData) => ({
        url: 'users/profile/avatar',
        method: 'POST',
        body: body
      })
    }),
    deleteAvatar: builder.mutation({
      query: () => ({
        url: 'users/profile/avatar',
        method: 'DELETE',

      })
    })

  }),
});

export const {useUploadAvatarMutation,useGetUserProfileQuery} = profileApi;

