import React from 'react'
import { useAuth } from '../context/AuthContext'


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
            <button onClick={()=> signInHandle()}>Google Button</button>
        </div>
    )
}
