import express from 'express'
import userRoute from './routes/user.route.js'
import postRoute from './routes/post.route.js'
import commentRoute from './routes/comment.route.js'
import cookieParser from 'cookie-parser';

const app = express();


app.use(cookieParser())

app.use(express.json())


app.use('/v1/api/user', userRoute)
app.use('/v1/api/post', postRoute)
app.use('/v1/api/comment', commentRoute)



export {app}