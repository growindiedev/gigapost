import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'


const BlogForm = ({createBlog}) => {

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      url: '',
      likes: 0
    },
    onSubmit: (values) => {
      try {
        const blog = {
          title: values.title,
          author: values.author,
          url: values.url,
          likes: values.likes,
        }
        createBlog(blog)
        
      } catch (err) {
        console.error(err)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input 
        type="text"
        name="title"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <input 
        type="text"
        name="author"
        onChange={formik.handleChange}
        value={formik.values.author}
      />
      <input 
        type="text"
        name="url"
        onChange={formik.handleChange}
        value={formik.values.url}
      />
      <button type={submit}>
        Create
      </button>
    </form>
  )
}

export default BlogForm
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}