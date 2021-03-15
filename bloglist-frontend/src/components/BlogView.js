import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import Comment from './Comment'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'
import { GrLike } from 'react-icons/gr'
import { BsFillChatSquareQuoteFill } from 'react-icons/bs'
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
        <VStack w="xl" p="10" mx="auto" color="gray.600">
           <Stack w="xl" borderWidth="2px" borderRadius="md" overflow="hidden" py="5" px="6" spacing="2.5"  boxShadow="md" borderColor="gray.200" >
               <Heading size="lg" >{blog.title}</Heading>
               <Heading size="sm" color="gray.500">{blog.author}</Heading>
               <Text textAlign="justify" >{blog.content}</Text>
               <Text as="a" target="_" href={`https://${blog.url}`} _hover={{ color: 'blue.300' }} color="blue.500" fontSize="xl" fontWeight="medium">{blog.url}</Text>
                <HStack spacing="2" color="orange.500" fontSize="sm">
                    
                    <Text>Added by  <Badge colorScheme="orange"> {`${blog.user?.name}`}</Badge></Text>
                    
                    <Text>&#8226;</Text>
                    <Text fontWeight="medium" color="orange.400">{blog.likes}</Text>
                    <Icon 
                    cursor="grab"
                    _active={{ boxShadow: 'lg' }}
                    // width="20"
                    size="md"
                    as={GrLike}
                    onClick={addLike}
                    />
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
            <Heading size="sm" pt="10" pb="4" fontWeight="semibold" textAlign="left" ><Icon as={BsFillChatSquareQuoteFill}/> Comments</Heading>
            <CommentForm />
            {blog.comments && blog.comments.length !== 0 ? (
                <ul>
                {blog.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} p="1.5" variant="left-accent" w="lg" m="2.5" borderRadius="md" size="sm" fontSize="sm"/>
                ))}
                </ul>
            ) : (
                <Comment comment='Add the first comment for this blog' p="1.4" variant="solid" w="lg" m="2" borderRadius="md"/>
            )}
        </VStack>
    )
}

export default BlogView
