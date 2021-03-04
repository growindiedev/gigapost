import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersPage = () => {
    const users = useSelector(state => state.users)
    return (
        <>
            <h1>Users</h1>
            <div>
                <span>username</span>
                <span>blogs created</span>
                <ul>
                {users?.map((user) => (
                    <li  key={user?.id}>
                    <Link to={`/users/${user.id}`}>
                        <span >{user?.username}</span>
                        <span >{user?.blogs?.length}</span>
                    </Link>
                    </li>
                ))}
                </ul>
            </div>
        </>
    )
}

export default UsersPage
