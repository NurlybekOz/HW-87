
import {Button, Grid, ListItem, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import { useEffect } from "react";
import Spinner from "../../UI/Spinner/Spinner.tsx";
import dayjs from "dayjs";
import {apiUrl} from "../../../globalConstants.ts";
import {fetchAllPosts} from "./PostThunk.ts";
import {selectPosts, selectPostsLoading} from "./PostSlice.ts";

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const postsFetchLoading = useAppSelector(selectPostsLoading);

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [dispatch])


    return (
        <Grid container sx={{marginTop: "20px"}} spacing={2}>

            {postsFetchLoading ? <Spinner/> :
                <>
                    {posts.length === 0 ? <Typography variant='h4' color='textDisabled'>No posts yet</Typography> :
                        <Grid container direction='row' spacing={1}>
                            {posts.map((post, index) => (
                                <ListItem key={index} style={{ display: "flex", width: "100%", border: '1px solid', marginBottom: '10px', gap: '20px' }}>
                                    {post.image ?  <Grid sx={{width: '75px', height: '75px'}}>
                                        <img src={apiUrl + '/' + post.image} alt={post.title} style={{width: '100%', height: '100%'}}/>
                                    </Grid> : null}

                                        <Grid sx={{display: "flex", justifyContent: "space-between", flexDirection: 'column', alignItems: "start"}}>
                                            <Typography>{dayjs(post.datetime).format('DD.MM.YYYY HH:mm')} by <b>{post.user.username}</b></Typography>
                                            <Button  component={Link} to={`/posts/${post._id}`} sx={{textDecoration: 'underline'}}>{post.title}</Button>
                                        </Grid>
                                </ListItem>

                            ))}
                        </Grid>
                    }
                </>
            }

        </Grid>
    );
};

export default Posts;