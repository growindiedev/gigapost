import React from 'react'
import LoginForm from './LoginForm'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import {Flex, useToast, VStack, Heading} from '@chakra-ui/react'


const LoginPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const toast = useToast()

    const message = useSelector(state => state.notification)
    const handleLogin = async (username, password) => {
        if (!username || username === '' || !password || password === '') {
          console.log('something went wrong')
          dispatch(
            setNotification({ error: 'Please fill in username and password' }, 5),
          )
          return
        }
    
        try {
          await dispatch(login(username, password))
    
          history.push('/')
    
          // set notification message
          dispatch(
            setNotification(
              {
                notification: `${username} succesfully logged in`,
              },
              5,
            ),
          )
        } catch (err) {
          // set error message
          dispatch(
            setNotification(
              {
                error: 'wrong username or password',
              },
              5,
            ),
          )

          
          console.error(err)
        }
      }

    return (
        <>  				
					{/* <Flex justify='center' align='center' w='100%' h='93vh'> */}
            <VStack justify='center' align='center' w='100%' h='93vh' spacing="3" >
              <Heading mb="10" size="lg">Log in to Application</Heading>
            <LoginForm handleLogin={handleLogin}/>
            <Notification w="350px"/>
            </VStack>
          {/* </Flex> */}

        </>
    )
}

export default LoginPage
