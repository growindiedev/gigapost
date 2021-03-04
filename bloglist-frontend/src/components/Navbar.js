import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { NavLink, useHistory } from 'react-router-dom'

const Navbar = () => {
    const user = useSelector(state => state.login) 

    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInBloglistUser')
        dispatch(logout())
        history.push('/')
    }

    if(user){
        return (
            <nav>
                <ul>
                    <li>
                        <Navlink to="/blogs">blogs</Navlink>
                    </li>
                    <li>
                        <Navlink to="/users">users</Navlink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>{user?.name} logged in</span>
                    </li>
                    <li>
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        )
    } else {
        <nav>
            <button onClick={handleLogout}>
                Login
            </button>
        </nav>
    }
}

export default Navbar
