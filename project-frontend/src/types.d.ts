export interface RegisterMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}
export interface IPostMutation {
    title: string;
    description: string;
    image: string | null;
}
export interface IPost {
    _id: string;
    user: {
        _id: string;
        username: string;
    }
    title: string;
    description: string;
    image: file | null;
    datetime: string;
}
export interface IComment {
    _id: string;
    post: string;
    user: {
        _id: string,
        username: string,
    };
    message: string;
}
export interface ICommentMutation {
    message: string;
}