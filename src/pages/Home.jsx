import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useDispatch, useSelector} from 'react-redux';

function Home() {
    const dispatch = useDispatch()
    const postStore = useSelector((state) => state.post_store.posts);
    console.log(postStore);
  
    if (postStore.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {postStore.map((post) => (
                        <div key={post.postData.$id} className='p-2 w-1/4'>
                            <PostCard {...post.postData} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home