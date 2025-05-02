import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {IPostMutation} from "../../types";
import { toast } from "react-toastify";
import {Typography} from "@mui/material";
import PostForm from "./components/PostForm.tsx";
import {createPost} from "./PostThunk.ts";

const NewPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCreatePost = async (post: IPostMutation) => {
        try {
            dispatch(createPost(post)).unwrap();
            toast.success("Post was successfully created!");
            navigate('/')
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Typography variant='h4'  style={{textAlign: 'center', marginBottom: '20px', marginTop: "20px"}}>New Post</Typography>

            <PostForm onSubmitPost={onCreatePost}/>
        </>
    );

};

export default NewPost;