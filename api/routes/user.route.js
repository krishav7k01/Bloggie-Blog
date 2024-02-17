import express from 'express'
import { test, userSignIn, userSignUp } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test)
router.post('/signup', userSignUp)
router.post('/signin',userSignIn)


export default router