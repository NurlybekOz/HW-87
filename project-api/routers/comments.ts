import express from 'express';
import Comment from "../modules/Comment";
import User from "../modules/User";
import Post from "../modules/Post";

const CommentariesRouter = express.Router();

CommentariesRouter.get('/', async (req, res) => {
    const queryPostId = req.query.post_id as string;
    let commentaries = await Comment.find().populate({path: 'user', select: 'username'})
    if (queryPostId) {
        commentaries = commentaries.filter(commentary => commentary.post.toString() === queryPostId);
    }
    res.send(commentaries);
})

CommentariesRouter.post('/', async (req, res) => {

    if (!req.body.post_id || !req.body.message) {
        res.status(400).send({error: "post_id, message is required"});
        return;
    }
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

    const Posts = await Post.find()
    const postId = Posts.find(item => item.id === req.body.post_id);
    if (!postId) {
        res.status(400).send({error: "This post does not exist, comment cannot be published"});
        return;
    }
    const newCommentary = {
        post: postId,
        user: user._id,
        message: req.body.message,
    }

    const commentary = new Comment(newCommentary);
    await commentary.save();
    res.send(commentary);
})
export default  CommentariesRouter