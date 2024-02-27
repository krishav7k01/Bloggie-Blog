import express from 'express'
import { deleteUser, getUsers, google, test, userLogout, userSignIn, userSignUp, userUpdate } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import {upload} from '../middleware/multer.middleware.js'

const router = express.Router();

router.get('/test', test)
router.post('/signup', userSignUp)
router.post('/signin',userSignIn)
router.post('/google',google)
router.route('/update/:userId').post( verifyToken , upload.single("profilePhoto") ,userUpdate)
router.delete('/delete/:userId',verifyToken , deleteUser)
router.post('/logout/:userId',verifyToken, userLogout)
router.get('/getusers',verifyToken,getUsers)


export default router