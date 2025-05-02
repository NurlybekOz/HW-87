import mongoose from "mongoose";
import config from "./config";
import crypto from "node:crypto";
import User from "./modules/User";
import Post from "./modules/Post";
import Comment from "./modules/Comment";



const run = async() => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('posts');
        await db.dropCollection('comments');
    } catch (error) {
        console.log('Collection were not present, skipping drop');
    }

    const [User1, User2] = await User.create(
        {
            username: "Jonathan",
            password: "123",
            token: crypto.randomUUID()
        },
        {
            username: "July",
            password: "456",
            token: crypto.randomUUID()
        }
    )

    const [Post1, Post2] = await Post.create(
        {
            user: User1._id,
            title: 'Environment',
            description: 'Environment can be defined as a sum total of all the living and non-living elements and their effects that influence human life. While all living or biotic elements are animals, plants, forests, fisheries, and birds, non-living or abiotic elements include water, land, sunlight, rocks, and air.',
            image: 'fixtures/environment.jpeg',
            datetime: new Date(),
        },
        {
            user: User2._id,
            title: 'Music',
            description: 'music, art concerned with combining vocal or instrumental sounds for beauty of form or emotional expression, usually according to cultural standards of rhythm, melody, and, in most Western music, harmony. Both the simple folk song and the complex electronic composition belong to the same activity, music.',
            image: 'fixtures/music.jpeg',
            datetime: new Date(),
        }
    )

    await Comment.create(
        {
            user: User2._id,
            post: Post1._id,
            message: 'We all should care about our environment'
        },
        {
            user: User2._id,
            post: Post1._id,
            message: 'Thanks for the information'
        },
        {
            user: User1._id,
            post: Post2._id,
            message: 'I like classical musics'
        },
        {
            user: User1._id,
            post: Post2._id,
            message: 'There are so many types of music'
        },


    )
    await db.close()
}

run().catch(console.error);