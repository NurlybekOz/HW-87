import {createAsyncThunk} from "@reduxjs/toolkit";
import {IComment, ICommentMutation} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store.ts";

export const fetchCommentsByPostId = createAsyncThunk<IComment[], string>(
    'comments/fetchCommentsByPostId',
    async (PostId) => {
        const response = await axiosApi<IComment[]>('/commentaries?post_id=' + PostId)
        return response.data || [];
    }
)
export const createComment = createAsyncThunk<
    void,
    ICommentMutation,
    {state: RootState}
>(
    'comments/createComment',
    async (commentToAdd, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.post('/commentaries', commentToAdd, {
            headers: {Authorization: `${token}` }
        });
    }
);