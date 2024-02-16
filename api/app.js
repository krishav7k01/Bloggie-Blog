import express from 'express'
import userRoute from './routes/user.route.js'

const app = express();

app.use('/v1/api/user', userRoute)


export {app}