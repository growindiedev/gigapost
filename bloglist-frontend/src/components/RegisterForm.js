import React from 'react'
import PropTypes from 'prop-types'
import {useFormik} from 'formik'
import { BiUserCircle } from 'react-icons/bi'
import {FcLock} from 'react-icons/fc'
import {IoIosPersonAdd} from 'react-icons/io'


import {
	Input,
	Stack,
	Icon,
	InputGroup,
	InputLeftElement,
	Button,
	FormControl,
	FormHelperText,
	Image
} from '@chakra-ui/react';
import {EmailIcon, LockIcon} from '@chakra-ui/icons'

const RegisterForm = ({handleRegister}) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      name: ''
    },
    onSubmit: (values, {resetForm}) => {
      try {
        handleRegister(values.username, values.password, values.name)
        resetForm()
      } catch (err) {
        console.error(err)
      }
    },
  });

  // return (
  //   <form onSubmit={formik.handleSubmit}>
  //     <input
  //       placeholder="username"
  //       type="text"
  //       name="username"
  //       onChange={formik.handleChange}
  //       value={formik.values.username}
  //     />
  //     <input 
  //       placeholder="password"
  //       type="text"
  //       name="password"
  //       onChange={formik.handleChange}
  //       value={formik.values.password}
  //     />
  //     <input 
  //       placeholder="name"
  //       type="text"
  //       name="name"
  //       onChange={formik.handleChange}
  //       value={formik.values.name}
  //     />
      
  //     <button type="submit">
  //       Sign Up
  //     </button>
  //   </form>
  // )

  return (
    <form onSubmit={formik.handleSubmit}>
    <Stack spacing={3} bg="gray.200"
    w='350px'
    p={3}
    boxShadow='m'
    rounded='lg'>
      <FormControl isRequired >
      <InputGroup>
          <InputLeftElement children={<IoIosPersonAdd/>} />
          <Input 
            type='text' name='name' 
            placeholder='Name' 
            area-lable='name' 
            onChange={formik.handleChange} 
            value={formik.values.name}
            bg='white'
            />
        </InputGroup>
      </FormControl>
      <FormControl isRequired >
        <InputGroup>
          <InputLeftElement children={<BiUserCircle/>} />
          <Input 
            type='text' name='username' 
            placeholder='username' 
            area-lable='username' 
            onChange={formik.handleChange} 
            value={formik.values.username}
            bg='white'
            />
        </InputGroup>
      </FormControl>
      <FormControl isRequired >
        <InputGroup>
          <InputLeftElement children={<FcLock/>} />
          <Input
            type='password'
            placeholder='Password'
            aria-lable='Password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            bg='white'
          />
        </InputGroup>
      </FormControl>
      <Button
        type='submit'
        boxShadow='sm'
        _hover={{ boxShadow: 'md' }}
        _active={{ boxShadow: 'lg' }}
        width="100"
        >
        Sign up
      </Button>
      
      
      
    </Stack>
  </form>
  )
  
}

export default RegisterForm
RegisterForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}
