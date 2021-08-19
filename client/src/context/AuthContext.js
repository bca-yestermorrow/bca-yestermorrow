import { useContext, useEffect, useState } from "react";
import React from "react";
import { auth, db } from "../firebase";
import { provider } from "../firebase";


const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    //needs this because
    const [loading, setLoading] = useState(true)

    
    const value = {
        currentUser,
        signup,
        login,
        signout,
        googlesignin,
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function signup(email, password, firstname, lastname) {
        return auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                firstName: firstname,
                lastName: lastname
            })
        })
    }

    function signout() {
        return auth.signOut()
    }

    function googlesignin(){
        return auth.signInWithPopup(provider)
    }

    //notifies
    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
            // console.log(user)
            
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