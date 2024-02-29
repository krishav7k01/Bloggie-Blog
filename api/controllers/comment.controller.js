import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Comment from "../models/comment.post.js";
import { ApiResponse } from "../utils/apiResponse.js";



const createComment = asyncHandler(async(req,res) =>{


    const {comment , userId , postId } = req.body


    if(userId !== req.user._id)
    {
        return res.status(401).json(
            new ApiError(401,"Unathorized Access")
        )
    }

    const createdComment = await Comment.create({

        comment,
        postId,
        userId

    })

    if(!createdComment)
    {

        return res.status(400).json(
            new ApiError(400,"Something Went Wrong")
        )


    }

   return res.status(200).json(
    new ApiResponse(200, createdComment , "Comment Created Succesfully")
   )





})


export {createComment}