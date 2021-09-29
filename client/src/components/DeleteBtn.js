import React from 'react'
import { db } from "../firebase";
import { useAuth } from '../context/AuthContext';

export const DeleteBtn = ({docId, post}) => {
    console.log(post.id)
    const postRef = db.collection("posts").doc(post.id)

    const {currentUser} = useAuth()
    const clickHandler = () => {
        console.log(post.userId, currentUser.uid)
      if(currentUser.uid === post.userId){
        postRef.delete()
      }
    }


    return (
        <div>

           {currentUser.uid === post.userId && <button onClick={clickHandler}>
                DELETE
            </button>}
        </div>
    )
}
