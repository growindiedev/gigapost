import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import Comment from './Comment'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const history = useHistory()
  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  const addLike = async () => {
      try {
          const {id, author, url, title} = blog
          const updatedBlog = {
            user: blog.user?.id || blog.user,
            likes: blog.likes + 1,
            title,
            author,
            url,
          }

          dispatch(likeBlog(id, updatedBlog))

      } catch(err) {
        console.error(err)
        dispatch(
          setNotification(
            {
              error: `No nooo! ${err}`,
            },
            5,
          ),
        )  
      }
  }

  const deleteBlog = async (id, blog) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        // delete blog from db
        dispatch(removeBlog(id))
        history.push('/blogs')
        dispatch(
          setNotification(
            {
              notification: `Successfully removed ${blog.title} by ${blog.author}`,
            },
            5,
          ),
        )
      }
    } catch (err) {
      console.error(err)
      dispatch(setNotification({ error: `No nooo! ${err}` }, 5))
    }
  }

  if(!blog) {
      return null
  }

    return (
        <>
           <div>
               <h1>{blog.title}</h1>
               <div>{blog.author}</div>
               <a href={blog.url}>{blog.url}</a>
            <div>
                <span>{blog.likes}</span>
                <button onClick={addLike}>
                    like
                </button>
                <span > &#8226;</span>
                <span >Added by </span>
                <span >{blog.user?.name}</span>
            </div>
                {blog.user?.username === user?.username && (
                <button
                onClick={() => deleteBlog(blog.id, blog)}
                >
                Remove
                </button>
                )}
            </div> 
            <h2>Comments</h2>
            <CommentForm />
            {blog.comments && blog.comments.length !== 0 ? (
                <ul>
                {blog.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
                </ul>
            ) : (
                <span>Add the first comment for this blog</span>
            )}
        </>
    )
}

export default BlogView
