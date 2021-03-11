import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {Box, Heading, Text } from '@chakra-ui/react'
const Blog = ({blog, ...rest}) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px" width="xl" {...rest} borderRadius="md">
      <Link to={`/blogs/${blog.id}`}>
      <Heading fontSize="l" fontWeight="medium">{blog.title}</Heading>        
      <Box>
          <Text mt={3} fontSize="sm">{`Author: ${blog.author}`}</Text>
      </Box>
      </Link>
    </Box>
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