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

const editComment = asyncHandler(async(req,res)=>{

    const comment = await Comment.findById(req.params.commentId)

  if(!comment)
  {
    return res.status(404).json(

        new ApiError(404,"Comment Not Found")
    )
  }

  if(comment.userId !== req.user._id)
  {
    return res.status(401).json(

        new ApiError(401,"Unauthorized Access")
    )
  }

  comment.comment = req.body.comment

  await comment.save()

  return res.status(200).json(
    new ApiResponse(200,comment,"Comment Liked")
  )

})

const deletecomment = asyncHandler(async(req,res) =>{

    const commentFind = await Comment.findById(req.params.commentId)

    if(!commentFind)
    {
        return res.status(404).json
        (
            new ApiError(404,"Comment Not Found")
        )
    }

    if(req.user._id !== commentFind.userId && !req.user.isAdmin)
    {

        return res.status(401).json
        (
            new ApiError(401,"Unathorized Access")
        )

    }

    const deletedcommnet =  await Comment.findByIdAndDelete(req.params.commentId)

    if(!deletedcommnet)
    {

        return res.status(400).json
        (
            new ApiError(400,"Something Went Wrong")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, "Comment Deleted Succesfully")
    )


})

const getAllComments = asyncHandler(async(req,res)=>{


    if(!req.user.isAdmin)
    {
        return res.status(404).json(
            new ApiError(400,"Unathorized Access")
        )
    }

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sort = req.query.sort === 'aesc' ? 1 : -1

    const allComments = await Comment.find()
    .sort({createdAt : sort})
    .limit(limit)
    .skip(startIndex)

    if(!allComments)
    {
        return res.status(400).json(
            new ApiError(400,"Something Went Wrong")
        )
    }

    const countComments = await Comment.countDocuments()

    const now = new Date()

    const oneMonthAgo = new Date(
        now.getFullYear() , now.getMonth() -1 , now.getDate()
    )

    const lastMonthComments = await Comment.countDocuments({ createdAt : {$gte : oneMonthAgo}})



    return res.status(200).json(
        new ApiResponse(200,{
            allComments,countComments , lastMonthComments 
        }, "Comments Fetched Succesfully")
    )



})


export {createComment,
    getcomments,
    likeComment,
    editComment,
    deletecomment,
    getAllComments}