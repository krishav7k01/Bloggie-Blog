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

        },process.env.TOKEN_SECRET_KEY
    )
}

    const User = mongoose.model('User', userSchema)

    export default User;