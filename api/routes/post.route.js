import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { upload } from '../middleware/multer.middleware.js';
import { createPost, deletePost, getPosts, test, updatePost } from '../controllers/post.controller.js';

const router = express.Router();


router.get('/test',test)
router.route('/create').post(verifyToken, upload.single('postPhoto'),createPost)
router.get('/getposts',getPosts)
router.delete('/deleteuser/:postId/:userId',verifyToken,deletePost)
router.route('/update/:postId/:userId').put(verifyToken, upload.single('postPhoto'), updatePost)

export default router