import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useDispatch, useSelector } from 'react-redux';
import { getPostData } from '../store/postSlice';
function AllPosts() {
    //const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    const postStore = useSelector((state) => state.post_store.posts);
    console.log(postStore);
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

export default AllPosts