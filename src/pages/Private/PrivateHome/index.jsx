import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../utils/Usercontext'

import { getAllUsers, addUsers } from '../../../database/FunctionsDatabase'

export default function PrivateHome() {
  const { currentUser } = useContext(UserContext)
  const idUserConnected = currentUser.uid
  const idUserEmail = currentUser.email

  const [users, setUsers] = useState([])

  // Methode pour inscrire l'utlisateur dans la DB si ce n'est pas deja fait

  useEffect(() => {
    addNewUsers(idUserConnected)
  })

  const addNewUsers = (idUser) => {
    const foundId = users.find((users) => users.id === idUser)
    if (foundId === undefined) {
      console.log('Nouvel utilisateur dans la base de donnée')
      addUsers(idUser, idUserEmail)
    }
  }

  // Recupere la liste des utilisateurs
  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const data = await getAllUsers()
    setUsers(data.docs.map((doc) => ({ ...doc.data() })))
  }
  //console.log('Les utilisateurs', users)
  return (
    <div>
      <h1>Je suis connecté sur le compte - id : {idUserConnected}! </h1>
    </div>
  )
}
