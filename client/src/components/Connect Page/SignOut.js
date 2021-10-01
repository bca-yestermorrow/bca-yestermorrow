
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router'
import { Button } from '@material-ui/core'
//sign out might need to be async and be in a handler function 
export const SignOut = () => {

    const {signOut} = useAuth()
    const history = useHistory()
    async function signOutHandler(){
        try{
            await signOut()
            history.push('/')
        }catch{
            console.log('signOut didnt work for some reason')
        }
    }
    return (
        <div>
            <Button color="secondary" variant="contained" style={{width: "100%"}} onClick={() => signOutHandler()}>Sign Out</Button>
        </div>
    )
}

