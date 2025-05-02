import mongoose from "mongoose";
import User from "./User";
import Post from "./Post";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate:  {
            validator: async (value: string) => {
                const user = await User.findById(value);
                return  !!user;
            },
            message: "User not found",
        },
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        validate:  {
            validator: async (value: string) => {
                const post = await Post.findById(value);
                return  !!post;
            },
            message: "Post not found",
        },
    },
    message: String
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;