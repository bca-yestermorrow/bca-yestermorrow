import firebase from 'firebase/app'
import "firebase/auth"

console.log(process.env.REACT_APP_API)

const app = firebase.initializeApp({
    apiKey: "AIzaSyDUgM7rI1WUcNE4ChkrNClTcvUCQ-SgXbY",
    authDomain: "yestermorrow-auth-development.firebaseapp.com",
    projectId: "yestermorrow-auth-development",
    storageBucket: "yestermorrow-auth-development.appspot.com",
    messagingSenderId: "296184333576",
    appId: "1:296184333576:web:8cad8635fee7136c04d8bd"
})

export const auth = app.auth()
export default app