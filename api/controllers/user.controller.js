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
    return res.status(400).json(
     new ApiError(400, "All Field are Required"))
   }

   const existedUser = await User.findOne({
    $or : [{userName} , {email}]
   })

   if(existedUser)
   {
     return res.status(409).json(new ApiError(409, "User Existed"))
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
       return res.status(500).json( new ApiError(500, "Something wrong happen while registering the user"))
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User Registerd Succesfully")
    )

})

const userSignIn =  asyncHandler(async(req,res)=>{

    const{userName,email,password} = req.body

    if(!userName && !email)
    {
        return res.status(400).json(
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
       return  res.status(404).json(
            new ApiError(404, "User does not Exist")
        )
    }

    const isPasswordCorrect =await user.isPasswordCorrect(password)


    if(!isPasswordCorrect)
    {
       return res.json(
            new ApiError(401,"Incorrect Password")
        )
    }
    
    const token = user.generateToken()



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
       return res.status(400).json(
            new ApiError(400,"Auth Not Working")
        )
    }
    const user = await User.findOne({email}).select("-password")
    if(user)
    {
        const token = await user.generateToken()

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
            profilePhoto : googlePhotoUrl
        })

        const token = user.generateToken()

        const signInUser = await User.findById(user._id).select("-password")

        if(!signInUser)
        {
            res.status(404).json(
                new ApiError(404,"Something Went Wrong")
            )
        }

        const option = {
            httpOnly :  true,
            secure : true
        }

        return res.status(200)
        .cookie('token', token, option)
        .json(
            new ApiResponse(200,{
                user : signInUser , token
            },"Logged in Succesfully")
        )

    }

})

const userUpdate = asyncHandler(async (req,res) =>{

    const{userName , email, password}  = req.body

   
        if(req.user._id !== req.params.userId)
        {
           return res.status(403).json(
                new ApiError(403,"You are not allowed to update the user")
            )
        }

        if (!userName.match(/^[a-zA-Z0-9]+$/)) {
           
           return res.status(403).json(
                new ApiError(403, "Username cannot have Special Character")
            )
          }

          const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set:
                {
                    userName: userName?.trim().toLowerCase(),
                    email : email?.trim().toLowerCase(),
                }
            },
                {
                    new: true
                }
            
          ).select("-password")

          return res
          .status(200)
          .json(
            new ApiResponse(200, user , "Details Updated Succefully")
          )

})

const deleteUser = asyncHandler(async (req,res) =>{

    if(req.user._id !== req.params.userId)
    {
        return res.status(401).json(
            new ApiError(401,"You are not allowed to Delete the User")
        )
    }

    const delUser = await User.findByIdAndDelete(req.params.userId)

    if(!deleteUser)
    {
        return res.status(404).json(
            new ApiError(404, "Something went Wrong")
        )
    }

   return res.clearCookie('token').status(200).json(
        new ApiResponse(200,null,"User Deleted Succesfully")
    )
})

const userLogout = asyncHandler(async (req,res) =>{

    if(req.user._id !== req.params.userId)
    {
        return res.status(401).json(new ApiError(401,"You are not allowed to SignOut"))
    } 

    return res.clearCookie('token').status(200).json(
        new ApiResponse(200,null,"User Deleted Succesfully")
    )



})

export {
    test,
    userSignUp,
    userSignIn,
    google,
    userUpdate,
    deleteUser,
    userLogout
    
}