import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { upload } from '../middleware/multer.middleware.js';
import { createPost, getPosts, test } from '../controllers/post.controller.js';

const router = express.Router();


router.get('/test',test)
router.route('/create').post(verifyToken, upload.single('postPhoto'),createPost)
router.get('/getposts',getPosts)

export default router