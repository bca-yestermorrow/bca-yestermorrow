

import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from '../context/AuthContext'


export const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useAuth()
    return (
        <div>
            <Route
            {...rest}
            render={props =>{
                return currentUser ? <Component {...props} /> : <Redirect to="/" />
            }}>

            </Route>
        </div>
    )
}
