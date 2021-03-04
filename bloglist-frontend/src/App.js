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
import { initializeUsers } from './reducers/userReducer'
import Navbar from './components/Navbar'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dipatch])

  const user = useSelector(state => state.login)

  //check if user is in local storage
  useEffect(() => {
    const loggedInUserJSON = JSON.parse(
      window.localStorage.getItem('loggedInBloglistUser'),
    )
    if(loggedInUserJSON) {
      const user = loggedInUserJSON
      blogService.setToken(user?.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
    blogService.setToken(user?.token)
  }, [user])

  if(loggedUser === null ){
    return (
      <div>
        <Navbar user={loggedUser} />
        <Notification/>
        <LoginForm handleLogin = {handleLogin}/>
      </div>
    )
  } 
  return (
    <div>
    <Navbar user={loggedUser} />
    <Notification/>
    <h2>Blogs App</h2>
    <Togglable label1="create blog" label2="cancel">
    <BlogForm/>
    </Togglable>

    <Switch>

    <Route exact path="/users">
    <ShowUsers/>
    </Route>

    <Route  path="/users/:id">
      <Bloglist/>
    </Route>

    <Route exact path="/blogs">
      <ShowBlogs/>
    </Route>

    <Route path="/blogs/:id">
      <Blog/>
    </Route>
    
    </Switch>
    
     </div>
  )
}

export default App