import React from 'react'
import RegisterForm from './RegisterForm'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { registerUser } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

const RegisterPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()


      const handleRegister = async (username, password, name) => {
        if (!username || username === '' || !password || password === '' || name === '') {
          console.log('something went wrong')
          dispatch(
            setNotification({ error: 'Please fill in username and password' }, 5),
          )
          return
        }
    
        try {
          await dispatch(registerUser(username, password, name))
    
          history.push('/')
    
          // set notification message
          dispatch(
            setNotification(
              {
                notification: `${username} succesfully registered`,
              },
              5,
            ),
          )
        } catch (err) {
          // set error message
          dispatch(
            setNotification(
              {
                error: 'user already exists or something went wrong',
              },
              5,
            ),
          )
          console.error(err)
        }
      }

    return (
        <>
            <h2>Sign Up</h2>
            <Notification/>
            <RegisterForm handleRegister={handleRegister}/>
        </>
    )
}

export default RegisterPage
