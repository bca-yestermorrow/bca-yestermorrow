import React from 'react'
import { db } from "../firebase";
import { useAuth } from '../context/AuthContext';

export const DeleteBtn = ({handleEditModalClose, post}) => {
    const postRef = db.collection("posts").doc(post.id)

    const {currentUser} = useAuth()
    const clickHandler = () => {
        console.log(post.userId, currentUser.uid)
      if(currentUser.uid === post.userId){
        postRef.delete()
      }
      handleEditModalClose()
    }


    return (
        <div>

           {currentUser.uid === post.userId && <button onClick={clickHandler}>
                DELETE
            </button>}
        </div>
    )
}
