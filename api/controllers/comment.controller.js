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

const getcomments = asyncHandler(async(req,res) =>{





    const allComments = await Comment.find({
        postId : req.params.postId}).sort({
            createdAt: -1
        });

    if(!allComments)
    {
        return res.status(400).json(
            new ApiError(400,"Something Went Wrong")
        )
    }

    return res.status(200).json(
        new ApiResponse(200,allComments,"All Comments Fetched Succesfully")
    )



})

const likeComment = asyncHandler(async(req,res)=>{

  const comment = await Comment.findById(req.params.commentId)

  if(!comment)
  {
    return res.status(404).json(

        new ApiError(404,"Comment Not Found")
    )
  }

  const userIndex = comment.likes.indexOf(req.user._id);

  if(userIndex === -1)
  {
    comment.numberOfLikes +=1;
    comment.likes.push(req.user._id)
  }
  else
  {
    comment.numberOfLikes -=1;
    comment.likes.splice(userIndex , 1)
  }

  await comment.save()

  return res.status(200).json(
    new ApiResponse(200,comment,"Comment Liked")
  )




})


export {createComment,
    getcomments,
    likeComment}