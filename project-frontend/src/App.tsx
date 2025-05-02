import {Container, CssBaseline, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import AppToolbar from "./UI/AppToolbar/AppToolbar.tsx";
import Posts from "./features/posts/Posts.tsx";
import FullPost from "./features/posts/FullPost.tsx";
import NewPost from "./features/posts/NewPost.tsx";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";


const App = () => {
    const user = useAppSelector(selectUser);
    return (
        <>
            <CssBaseline />
            <ToastContainer/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Posts />} />
                        <Route path="/posts" element={<Posts />} />

                        <Route path="/posts/new" element={
                           <ProtectedRoute isAllowed={Boolean(user)}>
                               <NewPost />
                           </ProtectedRoute>
                        }/>

                        <Route path="/posts/:id" element={<FullPost />} />
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                    </Routes>
                </Container>
            </main>
        </>
    )
};

export default App
