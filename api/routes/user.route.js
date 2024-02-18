import express from 'express'
import { google, test, userSignIn, userSignUp } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test)
router.post('/signup', userSignUp)
router.post('/signin',userSignIn)
router.post('/google',google)


export default router