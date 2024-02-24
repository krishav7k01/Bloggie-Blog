import Post from "../models/post.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";




const test = asyncHandler((req,res) =>{

   return res.status(200).json(
        new ApiResponse(200,"Api is Working Fine")
    )

})

const createPost = asyncHandler(async(req,res)=>{

    const {title, content} = req.body

    console.log(content)

    if(!req.user.isAdmin)
    {   
        return res.status(403).json(
            new ApiError(403, "You are not Allowed to Create a Post")
        )
    }

    if(content == "undefined")
    {
        return res.status(401).json(
            new ApiError(401, "Content is Required")
        )
    }


    if([title,content].some((field) => field?.trim() === ''))
    {
        return res.status(401).json(
            new ApiError(401, "title and Coontent is Required")
        )
    }

    const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

    const postPhotoPath = req.file?.path

    const uploadPost = await uploadOnCloudinary(postPhotoPath)
    


    const post = await Post.create(
        {

            ...req.body,
            userId:req.user._id,
            slug,
            postPhoto : uploadPost.url 
        }
    )

    const uploadedPost = await Post.findOne(
        {
            slug:slug
        }
    )

    if(!uploadedPost)
    {
        return res.status(400).json(
            new ApiError(400, "Something Went Wrong")
        )

    }


    return res.status(200)
    .json(
        new ApiResponse(200,uploadedPost,"Post Uploaded Succesfully")
    )









})


export {test,
        createPost            

}