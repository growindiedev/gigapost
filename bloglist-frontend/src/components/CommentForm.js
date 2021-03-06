import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { createComment } from '../reducers/blogReducer'
import {useFormik} from 'formik'

const CommentForm = () => {

    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const match = useRouteMatch('/blogs/:id')
    const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

    const formik = useFormik({
        initialValues: {
          comment: '',
        },
        onSubmit: (values, {resetForm}) => {
            try {
                  const comment = {
                  title: values.comment,
                }
                const blogId = blog.id
                dispatch(createComment(blogId, comment))
                // reset input value
                resetForm()
              } catch (err) {
                console.error(err)
              }
        },
      });
    

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                placeholder="comment"
                type="text"
                name="comment"
                onChange={formik.handleChange}
                value={formik.values.comment}
            />            
            <button type="submit">
                Login
            </button>
        </form>
    )
}

export default CommentForm

