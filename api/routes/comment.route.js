import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createComment, deletecomment, editComment, getAllComments, getcomments, likeComment } from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/create',verifyToken, createComment)
router.get('/getcomments/:postId',getcomments)
router.put('/likecomment/:commentId' , verifyToken , likeComment )
router.put('/editcomment/:commentId' , verifyToken , editComment )
router.delete('/deletecomment/:commentId' , verifyToken , deletecomment )
router.get('/getallcomments' , verifyToken , getAllComments )

export default router