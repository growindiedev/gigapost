import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({blog}) => {
  return (
    <div>
      <Link to={`/blogs/${blog.id}`}>
        <h2>{blog.title}</h2>
        <div>
          <span>Author: </span>
          <span>{blog.author}</span>
        </div>
      </Link>
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
}