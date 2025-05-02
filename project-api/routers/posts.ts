import express from "express";
import {imagesUpload} from "../middlewares/multer";
import Post from "../modules/Post";
import User from "../modules/User";

const PostsRouter = express.Router();

PostsRouter.get("/", async (req, res) => {
    const Posts = await Post.find().populate({path: 'user', select: 'username'});
    res.send(Posts)
})

PostsRouter.get("/:id", async (req, res) => {
    const PostInfo = await Post.findById(req.params.id);
    res.send(PostInfo);
})

PostsRouter.post("/", imagesUpload.single('image'), async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: 'No token provided'});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'Wrong token'});
        return;
    }

    const newPost = {
        user: user._id,
        title: req.body.title,
        description: req.body.description,
        image: req.file ? 'images/' + req.file.filename : null,
        datetime: Date.now(),
    }
    const post = new Post(newPost);
    await post.save();
    res.send(post);

})

export default PostsRouter;