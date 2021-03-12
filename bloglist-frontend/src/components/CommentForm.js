import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { createComment } from '../reducers/blogReducer'
import {useFormik} from 'formik'
import {Input, Button, FormControl, InputGroup, InputLeftElement, HStack} from '@chakra-ui/react'
import {AiOutlineComment} from 'react-icons/ai'
import {BiCommentAdd} from 'react-icons/bi'

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
          <HStack w="lg">
          <FormControl isRequired >
                <InputGroup size="sm">
                  <InputLeftElement children={<AiOutlineComment/>} />
                  <Input 
                    placeholder="comment"
                    type="text"
                    name="comment"
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                  />
                </InputGroup>
            </FormControl>
                     
            <Button 
            type="submit" 
            size='sm' 
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
            borderRadius="sm"
            bg="gray.200"
            > <BiCommentAdd/>
            </Button>
            </HStack>
        </form>
    )
}

export default CommentForm

