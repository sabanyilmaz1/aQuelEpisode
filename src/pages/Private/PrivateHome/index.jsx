import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../utils/context'

import {
  getAllUsers,
  getAllSerieByUser,
  addUsers,
} from '../../../database/Database'

export default function PrivateHome() {
  const { currentUser } = useContext(UserContext)
  const idUserConnected = currentUser.uid

  const [users, setUsers] = useState([])
  const [series, setSeries] = useState([])

  // Methode pour inscrire l'utlisateur dans la DB si ce n'est pas deja fait

  useEffect(() => {
    addNewUsers(idUserConnected)
  }, [])

  const addNewUsers = (idUser) => {
    const foundId = users.find((users) => users.id === idUser)
    if (foundId === undefined) {
      addUsers(idUser)
    } else {
      console.log('Utilisateur deja dans la base de donnée')
    }
  }

  /*
  const newSerie = {
    idSerie: 1234,
    nombreSaisons: 11,
    nomSerie: 'Squid Game',
    genreSerie: 'Drame',
  }
*/
  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const data = await getAllUsers()
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  console.log(users)

  useEffect(() => {
    getSeries()
  }, [])

  const getSeries = async () => {
    const data = await getAllSerieByUser(idUserConnected)
    setSeries(data.docs.map((doc) => ({ ...doc.data() })))
  }

  console.log(series)
  /*
  useEffect(() => {
    addSeries(idUserConnected, newSerie)
  }, [])
  */

  return (
    <div>
      <h1>Je suis connecté sur le compte - id : {idUserConnected}! </h1>
    </div>
  )
}
