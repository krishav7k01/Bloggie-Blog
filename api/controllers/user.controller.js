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
        userName: userName.toLowerCase(),
        email: email.toLowerCase(),
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

const userSignIn =  asyncHandler(async(req,res)=>{

    const{userName,email,password} = req.body

    if(!userName && !email)
    {
        res.json(
            new ApiError(400, "username or password is required")
        )
    }

    const user = await User.findOne(
        {
        $or: [{userName}, {email}]
        }
    )

    if(!user)
    {
        res.json(
            new ApiError(404, "User does not Exist")
        )
    }

    const isPasswordCorrect =await user.isPasswordCorrect(password)


    if(!isPasswordCorrect)
    {
        res.json(
            new ApiError(401,"Incorrect Password")
        )
    }
    
    const token = await user.generateToken()



    const loggedInUser = await User.findById(user._id).select("-password")

    const option = {
        httpOnly :  true,
        secure : true
    }



    return res.status(200)
    .cookie("token", token , option)
    .json(
        new ApiResponse(200,
            {
                user : loggedInUser , token
            },"User Logged In Successfully")
    )




})

const google = asyncHandler(async(req,res)=>{

    const {email, name, googlePhotoUrl} = req.body;

    if(!email)
    {
        res.json(
            new ApiError(400,"Auth Not Working")
        )
    }
    const user = await User.findOne({email}).select("-password")
    if(user)
    {
        const token = user.generateToken()

        const option = {
            httpOnly :  true,
            secure : true
        }
    

       return  res.status(200)
        .cookie('token', token, option)
        .json(
            new ApiResponse(200,{
                user : user , token
            },"Logged in Succesfully")
        )
        
    }
    else
    {
        const generatedPassword = Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

        let userName = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4)

        let userNameExist = await User.findOne({userName})

        while(userNameExist)
        {
            userName = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-5)
            userNameExist = await User.findOne({userName})

        }

        const user = await User.create({

            userName,
            email,
            password : generatedPassword,
        })

        const token = user.generateToken()

        const signInUser = await User.findById(user._id).select("-password")

        if(!signInUser)
        {
            res.json(
                new ApiError(404,"Something Went Wrong")
            )
        }

        const option = {
            httpOnly :  true,
            secure : true
        }

        console.log(signInUser)

        return res.status(200)
        .cookie('token', token, option)
        .json(
            new ApiResponse(200,{
                user : signInUser , token
            },"Logged in Succesfully")
        )

    }

})

export {
    test,
    userSignUp,
    userSignIn,
    google
}