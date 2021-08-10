import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

const CreatePost = ({ handleClosePostModal }) => {
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [error, setError] = useState('')
  const { currentUser } = useAuth()

  useEffect(() => {
    db.collection('users')
      .where('email', '==', `${currentUser.email}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setFirstName(doc.data().firstName)
          setLastName(doc.data().lastName)
        })
      })
  }, [currentUser.email])

  async function handlePostSubmit(e) {
    e.preventDefault()

    // grab body message
    let body = e.target.body.value

    // create tags array
    let options = e.target.category.selectedOptions
    let tags = []
    Array.from(options).forEach((option) => tags.push(option.value))

    // reset error
    setError('')

    // add user to the posts collection
    try {
      await db.collection('posts').add({
        body: body,
        category: tags,
        Image: false,
        user: {
          email: currentUser.email,
          firstName: firstName,
          lastName: lastName,
        },
      })
    } catch (err) {
      setError('Sorry, please try again.')
      console.log(err)
    }
  }

  return (
    <div id='createPost'>
      {firstName && <h3>{firstName}</h3>}
      {lastName && <h3>{lastName}</h3>}
      <form id='createPostForm' onSubmit={handlePostSubmit}>
        <textarea
          id='postBody'
          type='text'
          name='body'
          placeholder='Post message...'
        ></textarea>
        <select multiple='multiple' id='categoryMenu' name='category'>
          <option>Categories:</option>
          <option value='Tiny Houses'>Tiny Houses</option>
          <option value='Tree Houses'>Tree Houses</option>
        </select>
        <input type='submit' id='postButton' value='Create Post' />
      </form>
      {error && error}
    </div>
  )
}

export default CreatePost
