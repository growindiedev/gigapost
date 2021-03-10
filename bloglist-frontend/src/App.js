import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import UsersPage from './components/UsersPage'
import User from './components/User'
import BlogView from './components/BlogView'
import RegisterPage from './components/RegisterPage'
import { initializeUsers } from './reducers/userReducer'
import Navbar from './components/Navbar'
import { ChakraProvider } from "@chakra-ui/react"


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(state => state.login)

  //check if user is in local storage
useEffect(() => {
    const loggedInUserJSON = JSON.parse(
      window.localStorage.getItem('loggedInBloglistUser'),
    )
    if (loggedInUserJSON) {
      const user = loggedInUserJSON
      blogService.setToken(user?.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))
    blogService.setToken(user?.token)
  }, [user])


  return (
    <>
      <ChakraProvider >
      <Navbar/>
        <main>
          <div>
            <Switch>
              <Route path="/users/:id" component={User} />
              <Route path="/blogs/:id" component={BlogView} />
              <Route path="/login" exact render={() => (user ? <Redirect to="/"/> : <LoginPage/>)}/>
              <Route path="/signup" exact render={() => (user ? <Redirect to="/"/> : <RegisterPage/>)} />
              <Route path="/users" exact component={UsersPage} />
              <Route
                path="/"
                render={() => (user ? <HomePage /> : <Redirect to="/login" />)}
              />
            </Switch>
          </div>
        </main>
        </ChakraProvider>
    </>
  )
}

export default App