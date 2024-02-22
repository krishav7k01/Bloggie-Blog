import express from 'express'
import { deleteUser, google, test, userLogout, userSignIn, userSignUp, userUpdate } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)
router.post('/signup', userSignUp)
router.post('/signin',userSignIn)
router.post('/google',google)
router.put('/update/:userId', verifyToken , userUpdate)
router.delete('/delete/:userId',verifyToken , deleteUser)
router.post('/logout/:userId',verifyToken, userLogout)


export default router