
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router'
//sign out might need to be async and be in a handler function 
export const SignOut = () => {

    const {signout} = useAuth()
    const history = useHistory()
    async function signOutHandler(){
        try{
            await signout()
            history.push('/')
        }catch{
            console.log('signout didnt work for some reason')
        }
    }
    return (
        <div>
            <button onClick={() => signOutHandler()}>Signout button</button>
        </div>
    )
}

