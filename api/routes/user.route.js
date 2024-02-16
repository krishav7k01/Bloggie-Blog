import express from 'express'
import { test, userSignUp } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test)
router.post('/signup', userSignUp)


export default router