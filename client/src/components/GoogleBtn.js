import React from 'react'
import { useAuth } from '../context/AuthContext'
import {GoogleLoginButton} from "react-social-login-buttons"


export const GoogleBtn = () => {
    const {googlesignin} = useAuth()

    async function signInHandle() {
        try{
            await googlesignin()
        }catch{
            console.log('google sign in didnt work')
        }
    }
    return (
        <div>
            <GoogleLoginButton  iconSize={"1.5vw"} align={"center"} onClick={()=> signInHandle()} /> 
         </div>
    )
}
