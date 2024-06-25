import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: "post_store",
    initialState,
    reducers: {
        getPostData: (state, action) => {
            const post= {
                    postData:action.payload
            }
            state.posts.push(post)
        },
        removePost: (state, action) => {
             state.posts=state.posts.filter((eachpost) => eachpost.postData.$id !== action.payload)
         },
        makeEmpty: (state, action) => {
           state.posts=[]
        }
     }
})

export const {getPostData, removePost,makeEmpty} = postSlice.actions;

export default postSlice.reducer;