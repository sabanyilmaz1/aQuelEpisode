import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../utils/Usercontext'

import { getAllUsers, addUsers } from '../../../database/FunctionsDatabase'
import {
  DetailStyle,
  DetailWrapper,
  PageWrapper,
  WelcomeStyle,
  WelcomeWrapper,
  StyledLink,
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
        <DetailStyle>
          <span style={{ color: '#e0ba43' }}>
            Pour commencer à suivre vos séries préferées :
          </span>
          <br />- Aller à la page{' '}
          <StyledLink to="/private/addseries">Ajouter une série</StyledLink> et
          ajouter toutes vos séries preferées <br /> - Si vous voulez avoir un
          suivi global de vos séries, aller à la page{' '}
          <StyledLink to="/private/myseries">Mes Séries</StyledLink>
          <br />- Si vous avez plusieurs épisodes d’une série à cocher , aller à
          la page{' '}
          <StyledLink to="/private/myseries">
            Mes séries - nomSérie
          </StyledLink>{' '}
          ( en cliquant sur le nom de la série puis sur une saison) <br />- Si
          vous avez vu un seul épisode, aller directement à la page{' '}
          <StyledLink to="/private/episodestosee">À voir</StyledLink> et cocher
          l’épisode regardé <br />- Si vous voulez connaître la date de sortie des
          episodes encore non diffusés à la page, Aller à la page{' '}
          <StyledLink to="/private/episodescomingsoon">À venir</StyledLink> pour avoir la
          date de sorties des épisodes
        </DetailStyle>
      </DetailWrapper>
    </PageWrapper>
  )
}
