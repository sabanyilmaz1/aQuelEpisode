import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../utils/Usercontext'

import { getAllUsers, addUsers } from '../../../database/FunctionsDatabase'
import {
  DetailContainer,
  DetailStyle,
  DetailWrapper,
  PageWrapper,
  WelcomeStyle,
  WelcomeWrapper,
} from './style'

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
    <PageWrapper>
      <WelcomeWrapper>
        <WelcomeStyle>Bienvenue sur ÀQuelEpisode?</WelcomeStyle>
      </WelcomeWrapper>

      <DetailWrapper>
        <DetailContainer>
          <DetailStyle>
            <span style={{ color: '#e0ba43' }}>
              Pour commencer à suivre vos séries préferées :
            </span>
            <br />
            - Aller à la page ‘Ajouter une série’ et ajouter tous vos séries
            preferées <br /> - Si vous voulez avoir un suivi globale de vos
            séries, aller à la page ‘Mes séries’ <br />- Si vous avez plusieurs
            épisodes d’une série à cocher , aller à la page ’Mes séries -
            nomSérie’ ( en cliquant sur le nom de la série) <br />- Si vous avez
            vu un seul épisode, aller directement à la page ‘À voir’ et cocher
            l’épisode regardé <br />- Si vous voulez savoir la sorties des
            episodes encore non diffusées à la page ‘À venir’ pour avoir la date
            de sorties des épisodes
          </DetailStyle>
        </DetailContainer>
      </DetailWrapper>
    </PageWrapper>
  )
}
