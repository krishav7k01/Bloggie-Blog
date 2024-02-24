import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { upload } from '../middleware/multer.middleware.js';
import { createPost, test } from '../controllers/post.controller.js';

const router = express.Router();


router.get('/test',test)
router.route('/create').post(verifyToken, upload.single('postPhoto'),createPost)

export default router