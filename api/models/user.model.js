import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";


const userSchema = new mongoose.Schema(
    {
        userName : {
            type:String,
            required: true,
            unique: true,
        },
        email:{
            type:String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        profilePhoto:{
            type:String,
            default:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        },
        isAdmin:{
            type:Boolean,
            default: false
        },
        profilePhotoPublicId:{
            type:String
        }
     },
     { 
        timestamps: true
    }
    )

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function(){
       
   return jwt.sign(
        {
            _id : this._id,
            email: this.email,
            userName : this.userName,
            isAdmin: this.isAdmin,
            profilePhoto : this.profilePhoto,

        },process.env.TOKEN_SECRET_KEY
    )
}

    const User = mongoose.model('User', userSchema)

    export default User;