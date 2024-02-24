import mongoose, { Schema } from "mongoose";


const postSchema = new mongoose.Schema(
    {
        userId:
        {
            type : Schema.Types.ObjectId,
            ref:"User"
        },
        title:
        {
            type:String,
            required: true,
            unique: true
        },
        category:
        {
            type:String,
            default: 'uncategorized'
        },
        postPhoto:
        {
            type:String,
            default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
        },
        slug: {
            type: String,
            required: true,
            unique: true,
          },


    },
    {
        timestamps:true
    }
);

const Post = mongoose.model('Post', postSchema)

export default Post