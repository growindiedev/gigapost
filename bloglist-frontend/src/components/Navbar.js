import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { NavLink, useHistory } from 'react-router-dom'
import {Flex, Box, Spacer, Button, Heading, Text, Link, ButtonGroup} from '@chakra-ui/react'

const Navbar = () => {
    const user = useSelector(state => state.login) 

    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInBloglistUser')
        dispatch(logout())
        history.push('/')
    }

    const handlesignup = () => {
        window.localStorage.removeItem('loggedInBloglistUser')
        dispatch(logout())
        history.push('/signup')
    }

    if(user){
        return (
            // <nav>
            //     <ul>
            //         <li>
            //             <NavLink to="/blogs">blogs</NavLink>
            //         </li>
            //         <li>
            //             <NavLink to="/users">users</NavLink>
            //         </li>
            //     </ul>
            //     <ul>
            //         <li>
            //             <span></span>
            //         </li>
            //         <li>
            //             <button onClick={handleLogout}>
            //                 Logout
            //             </button>
            //         </li>
            //     </ul>
            // </nav>
            <Flex bg="gray.300" align="center" px="20"  color="gray.600" py="2">
                <Box p="2"> 
                <Text size="sm"><NavLink to="/blogs" >blogs</NavLink></Text>
                </Box>
                <Box p="2"> 
                <Text size="sm" ><NavLink to="/users">users</NavLink></Text>
                </Box>
                <Spacer />
                <Flex  alignItems="center">
                    
                    <Text size="sm" mr="4">{`${user.name} logged in `}</Text>
                    
                    <Button p="2" colorScheme="blue" onClick={handleLogout} size="sm" variant="outline" borderRadius="sm">Logout</Button>
                </Flex>
            </Flex>
        )
    } else {
        return (
        <Flex bg="gray.300" align="center" px="20"  color="gray.600" py="1.5">
        <Box p="2">
            <Heading size="md">GigaPost</Heading>
        </Box>
        <Spacer />
        <ButtonGroup variant="outline" spacing="6" size="sm" colorScheme="teal" border="none" >
            <Button onClick={handlesignup} borderRadius="sm">
            Sign Up
            </Button>
            <Button onClick={handleLogout} borderRadius="sm">Log in</Button>
        </ButtonGroup>
        </Flex>
        
        )
    }
}

export default Navbar
