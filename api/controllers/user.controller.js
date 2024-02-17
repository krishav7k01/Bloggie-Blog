import User from "../models/user.model.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apierror.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const test = asyncHandler(async(req,res)=>{
    res.json({
        message: 'APi is working'
    })
})


const userSignUp = asyncHandler(async(req,res)=>{

   const {userName,email,password} = req.body

   if(
    [userName,email,password].some((field) => field?.trim() === "")
   )
   {
     res.json(
     new ApiError(400, "All Field are Required"))
   }

   const existedUser = await User.findOne({
    $or : [{userName} , {email}]
   })

   if(existedUser)
   {
    res.json(new ApiError(409, "User Existed"))
   }

   const user = await User.create(
    {
        userName,
        email,
        password
    }
    )

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser)
    {
        res.json( new ApiError(500, "Something wrong happen while registering the user"))
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User Registerd Succesfully")
    )

})

export {
    test,
    userSignUp
}