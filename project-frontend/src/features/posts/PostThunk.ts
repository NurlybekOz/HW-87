import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {IPost, IPostMutation} from "../../types";
import {RootState} from "../../app/store.ts";

export const fetchAllPosts = createAsyncThunk<IPost[], void>(
    'posts/fetchAllPosts',
    async () => {
        const response = await axiosApi.get<IPost[]>('/posts');
        return response.data;
    }
);

export const fetchPostById = createAsyncThunk<IPost, string>(
    'posts/fetchPostById',
    async (post_id) => {
        const response = await axiosApi.get<IPost>('/posts/' + post_id);
        return response.data || null;
    }
);


export const createPost = createAsyncThunk<
    void,
    IPostMutation,
    {state: RootState}
>(
    'posts/createPost',
    async (postToAdd, {getState}) => {
        const token = getState().users.user?.token;

        const formData = new FormData();
        const keys = Object.keys(postToAdd) as (keyof IPostMutation)[];

        keys.forEach(key => {
            const value = postToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post('/posts', formData, {
            headers: { Authorization: `${token}` }
        });
    }
);