import React from "react";
import { Chip, Card, Avatar, Checkbox, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import firebaseApp from "../firebase";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const FilterFeed = () => {
  const [category, setCategory] = useState(["General"]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log("Category changed...");
    const unsub = db
      .collection("posts")
      .where("category", "array-contains-any", category)
      .onSnapshot((querysnap) => {
        const updatedPosts = querysnap.docs.map((doc) => ({
          id: doc.id,

          ...doc.data(),
        }));
        setPosts(updatedPosts);
      });
    setLoading(false);
    return () => unsub();
  }, [category, checked]);

  function onChangeHandler(e) {
    // console.log('onChangeHandler', e)

    let newArr = [];

    console.log(e.currentTarget.checked);
    if (e.currentTarget.checked === true) {
      setChecked(!checked);

      // add a filter tag
      newArr = [...category, e.currentTarget.value];
      setCategory(newArr);

      console.log(newArr);
    } else {
      setChecked(!checked);

      // remove a filter tag
      let tmpCategories = category;
      let index = tmpCategories.indexOf(e.currentTarget.value);
      if (index > -1) {
        tmpCategories.splice(index, 1);
      }
      setCategory(tmpCategories);
      // print out category
      console.log(category);
    }
  }

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Lord of the Rings: The Return of the King", year: 2003 },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
    { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    { title: "The Lord of the Rings: The Two Towers", year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
  ];

  return (
    <Card>
      <h2>Filter By Tags</h2>
      <Checkbox
        onChange={(e) => onChangeHandler(e)}
        value="Tiny Houses"
        label="Tiny Houses"
      ></Checkbox>
      Tiny House
      <Checkbox
        onChange={(e) => onChangeHandler(e)}
        value="Tree Houses"
        label="Tree Houses"
      ></Checkbox>
      Tree House
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.category}</li>
        ))}
      </ul>
      {categoryList.length > 0 && (
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={categoryList}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </React.Fragment>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Checkboxes"
              placeholder="Favorites"
            />
          )}
        />
      )}
    </Card>
  );
};
