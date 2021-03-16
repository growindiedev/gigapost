import React from 'react'
import PropTypes from 'prop-types'
import {useFormik} from 'formik'
import { BiUserCircle } from 'react-icons/bi'
import {FcLock} from 'react-icons/fc'
import UseAnimations from "react-useanimations";
import satisfied from 'react-useanimations/lib/loading2'

import {
	Input,
	Stack,
	InputGroup,
	InputLeftElement,
	Button,
	FormControl,
	Center,
	Text,
	
} from '@chakra-ui/react';

const LoginForm = ({handleLogin}) => {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values, {resetForm}) => {
      try {
        handleLogin(values.username, values.password)
        resetForm()
      } catch (err) {
        console.error(err)
      }
    },
  });

  return (

    
    <form onSubmit={formik.handleSubmit}>
			<Stack spacing={3} bg="gray.200"
			w='350px'
			p={5}
			boxShadow='m'
			rounded='lg'>
				
				<Center>
				<UseAnimations animation={satisfied}  size={50}  strokeColor="inherit"/>
				</Center>
				<FormControl isRequired >
					<InputGroup>
						<InputLeftElement children={<BiUserCircle/>} />
						<Input 
							type='text' name='username' 
							placeholder='username' 
							area-label='username' 
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
							aria-label='Password'
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
					Login
				</Button>
				<Text fontSize="sm" textAlign="center" color="gray.400">Created by Jarryingnut 👨‍💻</Text>
				
				
			</Stack>
		</form>
  )
}

export default LoginForm
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}
