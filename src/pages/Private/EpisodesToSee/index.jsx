import React, { useState, useEffect, useContext } from 'react'

import { onSnapshot, collection, query } from 'firebase/firestore'
import { where } from 'firebase/firestore'
import { db } from '../../../firebase-config'
import { UserContext } from '../../../utils/Usercontext'

import EpisodeToSeeCard from '../../../components/EpisodeToSeeCard'
import styled from 'styled-components'

export const TitlePage = styled.h1`
  width: 424px;
  height: 118px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 55px;
  line-height: 88px;
  letter-spacing: -0.05em;
  color: #27187e;
  margin-left: 5%;
  margin-top: 2%;
`
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const AllEpisodes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`
export const NoEpisodeStyle = styled.div`
  height: 118px;
  font-family: 'Bebas Neue';
  font-size: 30px;
  color: #27187e;
  margin-left: 70px;
  margin-top: 10px;
`

export default function EpisodesToSee() {

  //Recupere les informations sur l'utilisateur connecté
  const { currentUser } = useContext(UserContext) 
  const idUserConnected = currentUser.uid
  const [series, setSeries] = useState([])

  useEffect(() => {
    // Recupere la liste des séries de l'utilisateur non terminés
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'Utilisateurs', idUserConnected, 'Series'),
        where('estTermine', '==', false)
      ),
      (serie) => {
        setSeries(serie.docs.map((doc) => doc.data()))
      }
    )
    return unsubscribe
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <PageContainer>
      <TitlePage>À Voir</TitlePage>
      {series.length === 0 && (
        <div>
          <NoEpisodeStyle>
            Pas d'épisode à regarder, vous êtes à jour !{' '}
          </NoEpisodeStyle>
        </div>
      )}
      <AllEpisodes>
        {series.map((serie, index) => (
          <EpisodeToSeeCard
            key={`${serie.nomSerie}-${index}`}
            pictureSeries={serie.imageSerie}
            nameSeries={serie.nomSerie}
          />
        ))}
      </AllEpisodes>
    </PageContainer>
  )
}
