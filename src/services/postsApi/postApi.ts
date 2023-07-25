import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {settings} from "@/settings";

export type AddPostPhotoResponseType = {
    images: ImagesType[]
}

type ChildrenMetadata = {
    uploadId: string
}

export type PostType = {
    description: string
    childrenMetadata: ChildrenMetadata[]
}

export type FetchPostResponseType = {
    id: number
    description: string
    location: string
    images: ImagesType[]
    createdAt: Date
    updatedAt: string
}

export type ResponseType<T> = {
    totalCount: number
    pagesCount: number
    page: number
    pageSize: number
    items: T
}

type ImagesType = {
    url: string
    width: number
    height: number
    fileSize: number
    uploadId: string
}



export const postApi = createApi({
    reducerPath: 'postApi',
    tagTypes:["userPosts"],
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
    endpoints:builder =>  ({
        fetchPosts: builder.query<ResponseType<FetchPostResponseType[]>,{userId:number,pageNumber:number}>({
        query:({userId,pageNumber}) => `posts/${userId}?pageNumber=${pageNumber}&pageSize=12`,
            serializeQueryArgs: ({ endpointName}) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {

                if (currentCache.page !== newItems.page) {
                    currentCache.page = newItems.page
                    currentCache.items.push(...newItems.items)
                }

            },
            forceRefetch({ currentArg, previousArg}) {
                return !(previousArg?.pageNumber === currentArg?.pageNumber)
            },
   }),
        addPostPhoto: builder.mutation<AddPostPhotoResponseType, FormData>({
            query: body => ({
                url: 'posts/image',
                method: 'POST',
                body
            })
        }),
        addPost: builder.mutation<FetchPostResponseType, PostType>({
            query: body => ({
                url: 'posts',
                method: 'POST',
                body
            }),
        }),
    })
})


export const {useAddPostPhotoMutation, useAddPostMutation,useFetchPostsQuery} = postApi