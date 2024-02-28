import Post from "../models/post.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";




const test = asyncHandler((req,res) =>{

   return res.status(200).json(
        new ApiResponse(200,"Api is Working Fine")
    )

})

const createPost = asyncHandler(async(req,res)=>{

    const {title, content} = req.body

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
            postPhoto : uploadPost.url ,
            postPhotoPublicId : uploadPost.public_id
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

const getPosts = asyncHandler(async(req,res) => {

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({

        ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
            {title : {$regex : req.query.searchTerm, $options: 'i'}},
            {content : {$regex : req.query.searchTerm, $options: 'i'}}
        ]
      })

    }).sort({updatedAt : sortDirection})
    .skip(startIndex)
    .limit(limit)

    const totalPosts = await Post.countDocuments();

    const now = new Date()

    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
    )

    const lastMonthsPosts = await Post.countDocuments({
        createdAt: {$gte: oneMonthAgo}
    })


return res.status(200)
.json(new ApiResponse(200, {
    data : posts , totalPosts , lastMonthsPosts
} , "Fetched Successfully"))


})

const deletePost = asyncHandler(async(req,res)=>{

    if(!req.user.isAdmin || req.user._id !== req.params.userId)
    {
        return res.status(401).json(
            new ApiError(401,"Unaithorized Access")
        )
    }

    const postCheck = await Post.findById(req.params.postId)

    if(postCheck.postPhotoPublicId)
    {
      const deletedPostPhoto = await cloudinary.uploader
      .destroy(postCheck.postPhotoPublicId).then
      (result => result  ).catch
             (error => error )

      if(deletedPostPhoto.http_code == 400)
          {
              return res.status(400).json(
                  new ApiError(400, "Something Went Wrong")
              )
          }
      
    }

    const deletedPost =  await Post.findByIdAndDelete(req.params.postId)

    if(!deletedPost)
    {
        return res.status(400).json(
            new ApiError(400,"Something Went Wrong")
        )
    }

    return res.status(200).json(
        new ApiResponse(200,"Post Deleted Successfully")
    )



})

const updatePost = asyncHandler(async(req,res) =>{

    const{content , title} = req.body


if(!req.user.isAdmin || req.user._id !== req.params.userId )
{
    return res.status(401).json(
        new ApiError(401,"Unauthorized")
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

    const postCheck = await Post.findById(req.params.postId)

    if(postCheck.postPhotoPublicId)
    {
      const deletedPostPhoto = await cloudinary.uploader
      .destroy(postCheck.postPhotoPublicId).then
      (result => result  ).catch
             (error => error )

      if(deletedPostPhoto.http_code == 400)
          {
              return res.status(400).json(
                  new ApiError(400, "Something Went Wrong")
              )
          }
      
    }


    const postPhotoPath = req.file?.path

    const uploadPost = await uploadOnCloudinary(postPhotoPath)

    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, 
        
        {

            $set : {

                
                ...req.body,
                slug,
                postPhoto : uploadPost.url ,
                postPhotoPublicId : uploadPost.public_id




            }
        },
        {
            new : true
        }
        

        
        )


        if(!updatedPost)
        {   

            return res.status(400).json(
                new ApiError(400, "Something Went Wrong")
            )

        }

        return res.status(200).json(
            new ApiResponse(200,updatedPost,"Post Updated Succesffully")
        )






})


export {test,
        createPost ,
        getPosts,
        deletePost,
        updatePost
}