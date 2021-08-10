import React from "react";
import { Chip, Card, Avatar, Checkbox } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import firebaseApp from "../firebase";

export const FilterFeed = (props) => {
  
  const [posts, setPosts] = useState([]);

  const [catergorys, setCategorys] = useState({catagoreys: null})

  const ref = db.collection("posts");

 useEffect(() =>{
     if(posts.length === 0){
         db.collection("posts")
         .get()
         .then((querySnapshot) => {
             const items = []
             querySnapshot.forEach((doc) => {
                items.push(doc.data())
                setPosts(items)
             })
             
         })
     }
     console.log(posts)
 })

  const tags = [
    { id: 1, title: "Tiny Houses" },
    { id: 2, title: "Wood Working" },
    { id: 3, title: "Stone Smithing" },
    { id: 4, title: "Big Houses" },
  ];


  const [checked, setChecked] = useState(false)
  const changeHandler = (e) =>{
      if(checked === false){
          setChecked(true)
      } else {
          setChecked(false)
      }
      
      console.log(checked)
  }

  //if your mapping over reach post
  //can do a conditional if(posts.category.includes(checkedCategory))

  return (
    <Card>
      <h2>Filter By Tags</h2>

      <Checkbox  onChange={() => changeHandler()} label="Tiny Houses"></Checkbox> 
    
        
    {/* {tags.map((tag) => (
        <div>
        <Checkbox/>
        {tag.title}
        </div>
    ))} */}

      {/* <Chip variant="outline" color={color} label="Building Stuff"/>
           <Chip variant="outline" color="primary" label="Stone Smithing"/>
           <Chip variant="outline" color="primary" label="Wood Working"/> */}
    </Card>
  );
};
