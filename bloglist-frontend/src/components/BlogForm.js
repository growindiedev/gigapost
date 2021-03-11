import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import {Input, Button, VStack, FormControl, InputGroup, InputLeftElement, Textarea} from '@chakra-ui/react'
import { MdFindInPage } from 'react-icons/md'
import { BsPersonLinesFill } from 'react-icons/bs'
import { FaPencilAlt } from 'react-icons/fa'


const BlogForm = ({createBlog}) => {

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      content: '',
      url: '',
      likes: 0
    },
    onSubmit: (values, {resetForm}) => {
      try {
        const blog = {
          title: values.title,
          author: values.author,
          content: values.content,
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
      <VStack w="xl"  spacing="2" justify="left" p="10">
      <FormControl isRequired >
					<InputGroup size="sm">
						<InputLeftElement children={<FaPencilAlt/>} />
            <Input 
              placeholder="Title"
              type="text"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </InputGroup>
			</FormControl>
      <FormControl isRequired >
					<InputGroup size="sm">
						<InputLeftElement children={<BsPersonLinesFill/>} />
            <Input 
              placeholder="Author"
              type="text"
              name="author"
              onChange={formik.handleChange}
              value={formik.values.author}
            />
          </InputGroup>
			</FormControl>
      <FormControl isRequired >
					<InputGroup size="sm">
            <Textarea 
              placeholder="📝 Content"
              type="text"
              name="content"
              onChange={formik.handleChange}
              value={formik.values.content}
            />
          </InputGroup>
			</FormControl>
      <FormControl isRequired >
					<InputGroup size="sm">
						<InputLeftElement children={<MdFindInPage/>} />
            <Input 
              placeholder="URL"
              type="text"
              name="url"
              onChange={formik.handleChange}
              value={formik.values.url}
            />
          </InputGroup>
			</FormControl>
      <Button 
      type="submit" 
      size='sm' 
      _hover={{ boxShadow: 'md' }}
			_active={{ boxShadow: 'lg' }}
      borderRadius="sm"
      width="20"
      >
        Create
      </Button>
      
      </VStack>
    </form>
  )
}

export default BlogForm
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}