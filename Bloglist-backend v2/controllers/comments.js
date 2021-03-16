const commentsRouter = require('express').Router()
const Blog = require('../models/Blog')
const Comment = require('../models/Comment')
const User = require('../models/User')
const {authenticateToken} = require('../utils/middleware')


  commentsRouter.get('/:id/comments', async (request, response) => {
   const { id } = request.params
    const blogWithComments = await Blog.findById(id).populate('comments')
    response.json(blogWithComments.toJSON())
    // const comments = Comment.find({})
    // response.json(comments)
  })

  
  commentsRouter.post('/:id/comments', authenticateToken, async (request, response) => {
    const {id} = request.params
    const blog = await Blog.findById(id)
    const decodedToken = request.decodedToken
    const user = await User.findById(decodedToken.id)

    const comment = new Comment({
        title: request.body.title, 
        blog: blog.id,
        user: user.id
    })

    const savedComment = await comment.save()
    // new experimental feature
    const commentWithUser = await savedComment.populate('user')
    //blog.comments = blog.comments.concat(savedComment.id)
    blog.comments = blog.comments.concat(commentWithUser.id)
    await blog.save()
    response.status(201).json(savedComment)

  })



  module.exports = commentsRouter
