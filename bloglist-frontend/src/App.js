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
  }, [dispatch])

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


  return (
    <>
      <Navbar/>
        <main>
          <div>
            <Link to="/">
              Gigapost
            </Link>
            <Switch>
              <Route path="/users/:id" component={User} />
              <Route path="/blogs/:id" component={BlogView} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/users" exact component={UsersPage} />
              <Route
                path="/"
                render={() => (user ? <HomePage /> : <Redirect to="/login" />)}
              />
            </Switch>
          </div>
        </main>
    </>
  )
}

export default App