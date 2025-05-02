import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
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
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    datetime: {
        type: Date,
        default: Date.now,
    }
});
PostSchema.pre('save', async function (next){
    if (!this.description && !this.image) {
        const error = new Error("Post must have description or image");
        next(error);
        return;
    }
    next();
})

const Post = mongoose.model('Post', PostSchema);
export default Post;