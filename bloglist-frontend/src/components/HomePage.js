import React from 'react'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import {VStack, Heading, Box, HStack, Center, Stack} from '@chakra-ui/react';
import UseAnimations from "react-useanimations";
import satisfied from 'react-useanimations/lib/loading2'

const HomePage = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.login)
    const dispatch = useDispatch()
    const blogFormRef = React.createRef()


    const addBlog = async (blogObject) => {
    try { // hide form after adding a blog
        blogFormRef.current.toggleVisibility()

        // check if all required fields are filled in
        if (!blogObject.title || !blogObject.author || !blogObject.url) {
            dispatch(setNotification({ error: 'Please fill in all the fields' }, 5))
            return
        }

        // Add new blog to db
        dispatch(createBlog(blogObject, user))

        //set notification message
        dispatch(
            setNotification(
              {
                notification: `A new blog ${blogObject.title} by ${blogObject.author} added`,
              },
              5,
            ),
          )
        } catch (err){
            // set error message
            dispatch(
                setNotification(
                  {
                    error: `No nooo! ${err}`,
                  },
                  5,
                ),
              )
              console.error(err)
        }   
    }


    return (
        <VStack spacing="3" p="10">
             <Notification w="xl"/>
             <Stack  align="flex-start" justify="center" w="xl" py="5" spacing="3">

            <Heading fontSize="xx-large" textColor="gray.700"><UseAnimations animation={satisfied}  size={50}  strokeColor="inherit"/>Gigablog</Heading>
            <Togglable btnText="New Blog" ref={blogFormRef} >
            
            <BlogForm createBlog={addBlog} />
            </Togglable>
            </Stack>
            <VStack spacing="3">
               {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                <Blog key={blog.id} blog={blog} />
                ))} 
            </VStack>
        </VStack>
    )
}

export default HomePage
