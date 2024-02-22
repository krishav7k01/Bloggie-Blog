import express from 'express'
import userRoute from './routes/user.route.js'
import cookieParser from 'cookie-parser';

const app = express();


app.use(cookieParser())

app.use(express.json())


app.use('/v1/api/user', userRoute)



export {app}