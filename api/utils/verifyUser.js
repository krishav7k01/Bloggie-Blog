import jwt from 'jsonwebtoken'
import { ApiError } from './apierror.js';


const verifyToken =  (req,res,next) => {

    const token = req.cookies.token;

    if(!token)
    {
        return res.status(401).json(
            new ApiError(401, "Unthorized")
        )
    }

  jwt.verify(token , process.env.TOKEN_SECRET_KEY, (err, user) => {

        if(err)
    {
        return res.status(401).json(
            new ApiError(401, 'Unthorized')
        )
    }
        req.user = user
        next();
    })

   
    

}


export {verifyToken};