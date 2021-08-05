
import { useContext, useEffect, useState } from 'react'
import React from 'react'
import {auth} from '../firebase'


const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    //needs this because
    const [loading, setLoading] = useState(false)


    const value = {
        currentUser,
        signup
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    //notifies
    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
            
        })

        return unsubscribe
    }, [])
    

    //only want this running when mounting component 
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
         
    )
}


