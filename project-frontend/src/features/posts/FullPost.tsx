import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Button, Container, Grid, ListItem, TextField, Typography} from "@mui/material";
import Spinner from "../../UI/Spinner/Spinner.tsx";
import dayjs from "dayjs";
import {ICommentMutation} from "../../types";
import {toast} from "react-toastify";
import {fetchPostById} from "./PostThunk.ts";
import {selectOnePost, selectPostsLoading} from "./PostSlice.ts";
import {createComment, fetchCommentsByPostId} from "../comments/commentThunk.ts";
import {selectComments, selectCommentsLoading} from "../comments/commentSlice.ts";
import {selectUser} from "../users/usersSlice.ts";

const FullPost = () => {
    const {id} = useParams();
    const [form, setForm] = useState<ICommentMutation>({
        message: '',
    })
    const dispatch = useAppDispatch()
    const post = useAppSelector(selectOnePost)
    const fetchLoading = useAppSelector(selectPostsLoading)
    const comments = useAppSelector(selectComments)
    const commentsLoading = useAppSelector(selectCommentsLoading)
    const user = useAppSelector(selectUser)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.message.trim()) {
            toast.error('message cannot be empty')
            return;
        }

        if (!user) {
            toast.error('You must be logged in to comment');
            return;
        }
        const commentToCreate = {
            user: user._id,
            message: form.message,
            post_id: id,
        }

        await dispatch(createComment(commentToCreate))
        toast.success("Created new comment")
        if (id) {
            dispatch(fetchCommentsByPostId(id))
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }


    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(id))
            dispatch(fetchCommentsByPostId(id))
        }
    }, [id, dispatch])

    return (
        <Container>

            {!fetchLoading && post ?
                <>
                    <Grid mt='20px' mb='20px'>
                        <Typography variant='h4'>
                            {post.title}
                        </Typography>
                        <Typography variant='body1' color='textDisabled'>
                            At {dayjs(post.datetime).format('DD.MM.YYYY HH:mm')}
                        </Typography>
                        <Typography variant='body1'>
                            {post.description}
                        </Typography>
                    </Grid>
                    <Typography variant='h4' mb='10px'>Comments</Typography>
                    {commentsLoading ? <Spinner/> :
                        <>
                            {comments.length === 0 ? <Typography color='textDisabled'>No comments yet</Typography> :
                                <Grid container direction='row' spacing={1}>
                                    {comments.map((comment, index) => (
                                        <ListItem key={index} style={{ display: "flex", width: "100%", border: '1px solid', gap: '20px' }}>
                                            <Grid sx={{flexGrow: '1', display: "flex", justifyContent: "space-between", alignItems: "center"}} >
                                                <Typography>
                                                    <b>{comment.user.username}</b> wrote: {comment.message}
                                                </Typography>
                                            </Grid>
                                        </ListItem>

                                    ))}
                                </Grid>
                            }
                        </>
                    }
                    {fetchLoading ? <Spinner /> : null}
                    {user ?
                        <Grid>
                            <form onSubmit={onSubmit} style={{ width: "50%", marginTop: '30px'}}>
                                <Grid container spacing={2} direction="column">
                                    <Typography variant='h4'>
                                        Add a comment
                                    </Typography>
                                    <Grid size={12}>
                                        <TextField
                                            style={{width:'100%'}}
                                            multiline rows={3}
                                            id='message'
                                            label="Comment"
                                            name="message"
                                            value={form.message}
                                            onChange={onInputChange}
                                        />
                                    </Grid>
                                    <Grid size={4}>
                                        <Button style={{width:'100%'}} type="submit" color="primary" variant="contained">
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                        : null}
                </>
                :
                <Typography variant="h4" mt='20px'>Not found post</Typography>
            }
        </Container>
    );
};

export default FullPost;