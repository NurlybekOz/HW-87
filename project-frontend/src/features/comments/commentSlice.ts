import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {IComment} from "../../types";
import {createComment, fetchCommentsByPostId} from "./commentThunk.ts";

interface CommentState {
    items: IComment[];
    fetchLoading: boolean;
}

const initialState: CommentState = {
    items: [],
    fetchLoading: false,
}

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCommentsByPostId.pending, (state) => {
            state.fetchLoading = true;
        }).addCase(fetchCommentsByPostId.fulfilled, (state, {payload: comments}) => {
            state.items = comments;
            state.fetchLoading = false;
        })

            .addCase(createComment.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.fetchLoading = false;
            }).addCase(createComment.rejected, (state) => {
            state.fetchLoading = false;
        })
    }
})

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoading;
