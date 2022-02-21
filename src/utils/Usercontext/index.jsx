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
  const [displayHeader, setDisplayHeader] = useState(false)

  const HideHeader = (modal) => {
    if (modal === 'connecté') {
      setDisplayHeader(true)
    } else if (modal === 'nonConnecté') {
      setDisplayHeader(false)
    }
  }

  // Fonctions Firebase pour gerer l'inscription,connexion et deconnexion des utlisateurs

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
      value={{
        signUpFirebase,
        currentUser,
        signInFirebase,
        displayHeader,
        HideHeader,
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  )
}
