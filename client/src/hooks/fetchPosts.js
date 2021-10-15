import { db } from "../firebase";
import { useState, useEffect } from "react";



const fetchPosts = () => {


    let first = db.collection("posts").orderBy("createdAt", "asc").limit(10)
    return first.get().then((documentSnapshots) => {
      console.log("first", first)
      let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
      console.log("last", lastVisible)

      let next = db.collection("posts").orderBy("createdAt", "asc").startAfter(lastVisible).limit(10)
      console.log("next", next)
    })

    
  
}

export default fetchPosts