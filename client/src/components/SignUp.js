
import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import React from 'react'

export const SignUp = () => {
    //Gives us a refrence to the value of input 
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signup } = useAuth()
    const [passwordError, setPasswordError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== confirmPasswordRef.current){
            return setPasswordError('Passwords do not match')
        }

        try{
            setPasswordError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            
        } catch{
            setPasswordError('account no work')
        }
        setLoading(false)
       
    }
    return (
        <div>
            <div className="card" onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <form id="Signup" >
              <h1>SIGN UP</h1>
              {passwordError && <h1>Error</h1>}
              <input
                className="signForm"
                type="email"
                name="email"
                ref={emailRef}
                placeholder="Enter your email..."
              />
              <input
                className="signForm"
                type="password"
                name="password"
                ref={passwordRef}
                placeholder="Enter a password..."
              />
              <input
                className="signForm"
                type="password"
                name="confirmPassword"
                ref={confirmPasswordRef}
                placeholder="Enter your password again..."
              />
              <button disabled={loading} type='submit'></button>
            </form>
            </div>
        </div>
    )
}



