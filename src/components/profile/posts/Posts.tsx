'use client'
import React, {useState} from 'react';
import {useFetchPostsQuery} from "@/services/postsApi/postApi";
import s from "@/components/profile/profilePage.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";


export const Posts:React.FC<{profileId:number}> = ({profileId}) => {

    const [page,setPage] = useState(1)

    const {data:posts,isLoading} = useFetchPostsQuery({
        userId:profileId, pageNumber:page
    },{skip:!profileId})

    return posts?.items.length ? (

                <InfiniteScroll next={() => setPage((prevState)=> prevState + 1)}
                                hasMore={posts.items.length < posts.totalCount}
                                loader={isLoading}
                                dataLength={posts.items.length}
                >
                    <div className={s.contentWrapper}>
                    {posts?.items?.map((post)=> (
                            <Image key={post.id} src={post.images[0].url} alt={post.description} className={s.contentImg}
                                   width={post.images[0].width} height={post.images[0].height}/>
                    )
                    )}
                    </div>
                </InfiniteScroll>
            ) :( <div>Create your first post</div>)

};
