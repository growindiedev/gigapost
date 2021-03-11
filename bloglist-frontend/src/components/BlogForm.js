import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import {Input, Button} from '@chakra-ui/react'


const BlogForm = ({createBlog}) => {

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      url: '',
      likes: 0
    },
    onSubmit: (values, {resetForm}) => {
      try {
        const blog = {
          title: values.title,
          author: values.author,
          url: values.url,
          likes: values.likes,
        }
        createBlog(blog)
        resetForm()
      } catch (err) {
        console.error(err)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input 
        placeholder="title"
        type="text"
        name="title"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <Input 
        placeholder="author"
        type="text"
        name="author"
        onChange={formik.handleChange}
        value={formik.values.author}
      />
      <Input 
        placeholder="url"
        type="text"
        name="url"
        onChange={formik.handleChange}
        value={formik.values.url}
      />
      <Button type="submit">
        Create
      </Button>
    </form>
  )
}

export default BlogForm
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}