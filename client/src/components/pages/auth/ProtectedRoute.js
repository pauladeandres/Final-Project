import Dashboard from '../Admin/Dashboard'
import { Redirect } from 'react-router-dom'
import { Component } from 'react'

const ProtectedRoute = ({ loggedUser, condition, component: Component, ...props }) => {
    console.log(loggedUser)
    console.log(condition)

    return loggedUser && condition ? <Component loggedUser={loggedUser} {...props} />
        :
        <Redirect to={'/login'} />
}

export default ProtectedRoute