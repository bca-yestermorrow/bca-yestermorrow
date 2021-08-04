import React from 'react'
import "../App.css";
import Map from './Map' 
import { useState, useEffect } from 'react';


const Landing = () => {
   
    return(
    <div id="landing">
            <header id="header">
                YESTERMORROW
            </header>
            <div id="mainLanding">
        <div id="form">
            SIGN UP
            <form id="Signup">
                <input type="text" name="email" placeholder="Enter your email..."/>
                <input type="text" name="password" placeholder="Enter a password..."/>
                <input type="text" name="confirmPassword" placeholder="Enter your password again..."/>
                <input type="submit" value="Sign Up"/>
            </form>
            Log In
            <form id="Login">
                <input type="text" name="email" placeholder="Enter your email..."/>
                <input type="text" name="password" placeholder="Enter your password..."/>
                <input type="submit" value="Login"/>
            </form>
        </div>
        <div id="map">
            <Map />
        </div>
        </div>
    </div>
     
        
    )
}

export default Landing 