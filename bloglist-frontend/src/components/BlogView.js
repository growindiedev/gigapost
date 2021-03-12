import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import Comment from './Comment'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'
import { GrLike } from 'react-icons/gr'
import {VStack, Box, Button, Icon, Heading, Text, HStack, Stack, Badge} from '@chakra-ui/react'


const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const history = useHistory()
  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const addLike = async () => {
      try {
          const {id, author, content, url, title} = blog
          const updatedBlog = {
            user: blog.user?.id || blog.user,
            likes: blog.likes + 1,
            title,
            content,
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
        <VStack w="xl" p="10" mx="auto">
           <Stack w="xl" borderWidth="1px" borderRadius="md" overflow="hidden" py="3" spacing="1" px="5">
               <Heading size="md">{blog.title}</Heading>
               <Text>{blog.author}</Text>
               <Text>{blog.content}</Text>
               <Text as="a" target="_" href={`https://${blog.url}`} _hover={{ fontColor: 'blue' }}>{blog.url}</Text>
                <HStack spacing="2">
                    <Text>{blog.likes}</Text>
                    <Icon 
                    size="md"
                    _hover={{ boxShadow: 'md' }}
                    _active={{ boxShadow: 'lg' }}
                    borderRadius="sm"
                    // width="20"
                    as={GrLike}
                    role="Button"
                    onClick={addLike}
                    />
                    <Text>&#8226;</Text>
                    <Badge colorScheme="orange"> {`Added by ${blog.user?.name}`}</Badge>
                </HStack>
                {blog.user?.username === user?.username && (
                <Button 
                size='xs' 
                _hover={{ boxShadow: 'md', bg: "red.200" }}
                _active={{ boxShadow: 'lg' }}
                borderRadius="sm"
                width="20"
                onClick={() => deleteBlog(blog.id, blog)}
                bg="red.200"
                p="3"
                >
                Remove
                </Button>
                )}
            </Stack> 
            <Heading size="md" pt="10">Comments</Heading>
            <CommentForm />
            {blog.comments && blog.comments.length !== 0 ? (
                <ul>
                {blog.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} p="1.5" variant="left-accent" w="lg" m="2.5" borderRadius="md" size="sm"/>
                ))}
                </ul>
            ) : (
                <Comment comment='Add the first comment for this blog' p="1.5" variant="left-accent" w="lg" m="2" borderRadius="md"/>
            )}
        </VStack>
    )
}

export default BlogView
