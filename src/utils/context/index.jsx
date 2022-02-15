import React from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { createContext, useState, useEffect } from 'react'

import { auth } from '../../firebase-config'

export const UserContext = createContext()

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState()
  const [loadingData, setLoadingData] = useState(true)

  const signUpFirebase = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd)

  const signInFirebase = (email, pwd) =>
    signInWithEmailAndPassword(auth, email, pwd)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser)
      setLoadingData(false)
    })
    return unsubscribe
  }, [])

  return (
    <UserContext.Provider
      value={{ signUpFirebase, currentUser, signInFirebase }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
