import React from 'react'
import LoginForm from './LoginForm'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {VStack} from '@chakra-ui/react'


const LoginPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

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
            <Notification/>
            <VStack py="40" maxHeight="max-content" spacing="5">
            {/* <Notification w="350px"/> */}
            <LoginForm handleLogin={handleLogin}/>
            </VStack>
        </>
    )
}

export default LoginPage
