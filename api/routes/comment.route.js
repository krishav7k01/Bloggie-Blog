import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createComment, editComment, getcomments, likeComment } from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/create',verifyToken, createComment)
router.get('/getcomments/:postId',getcomments)
router.put('/likecomment/:commentId' , verifyToken , likeComment )
router.put('/editcomment/:commentId' , verifyToken , editComment )

export default router