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

  const [detailsVisible, setDetailsVisible] = useState(false)
  const [idSeriesDetails, setSeriesDetails] = useState()
  const [idMySeriesDetails, setMySeriesDetails] = useState()

  const setIdSeries = (id) => {
    setSeriesDetails(id)
  }

  const setMySeries = (id) => {
    setMySeriesDetails(id)
  }

  const toogleDetails = (modal) => {
    if (modal === 'afficheDetails') {
      setDetailsVisible(true)
    }
    if (modal === 'fermeDetails') {
      setDetailsVisible(false)
    }
  }

  const HideHeader = (etat) => {
    if (etat === 'connecté') {
      setDisplayHeader(true)
    } else if (etat === 'nonConnecté') {
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
        detailsVisible,
        toogleDetails,
        idSeriesDetails,
        setIdSeries,
        idMySeriesDetails,
        setMySeries,
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  )
}
