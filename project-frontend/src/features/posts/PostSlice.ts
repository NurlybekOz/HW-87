import {createSlice} from "@reduxjs/toolkit";
import {IPost} from "../../types";
import {RootState} from "../../app/store.ts";
import {createPost, fetchAllPosts, fetchPostById } from "./PostThunk.ts";

interface PostState {
    items: IPost[];
    item: IPost | null;
    fetchLoading: boolean;
}

const initialState: PostState = {
    items: [],
    item: null,
    fetchLoading: false,
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.fetchLoading = true;
        }).addCase(fetchAllPosts.fulfilled, (state, {payload: posts}) => {
            state.items = posts;
            state.fetchLoading = false;
        })
            .addCase(fetchPostById.pending, (state) => {
                state.fetchLoading = true;
            }).addCase(fetchPostById.fulfilled, (state, {payload: post}) => {
            state.item = post;
            state.fetchLoading = false;
        })

            .addCase(createPost.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.fetchLoading = false;
            })
            .addCase(createPost.rejected, (state) => {
                state.fetchLoading = false;
            })
    }
})

export const postsReducer = postsSlice.reducer;
export const selectOnePost = (state: RootState) => state.posts.item;
export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.fetchLoading;
