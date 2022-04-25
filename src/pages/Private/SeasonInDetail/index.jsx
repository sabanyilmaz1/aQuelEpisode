import React from 'react'
import { useLocation } from 'react-router-dom'

import { TitleDiv, TitleText } from '../MySeriesInDetail/style'
import EpisodeCard from '../../../components/EpisodeCard'
import { EpisodesWrap, PageContainer } from './style'
import { useState, useEffect, useContext } from 'react'
import {
  onSnapshot,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'

import { UserContext } from '../../../utils/Usercontext'
import { db } from '../../../firebase-config'

export default function SeasonInDetail() {
  //Recupere les données envoyé depuis les autres pages qui se redirige vers cette page
  const { state } = useLocation()
  const numSeason = state.numSeason
  const nameSeries = state.idSerie

  const { currentUser } = useContext(UserContext) //Recupere les informations sur l'utilisateur connecté
  const idUserConnected = currentUser.uid

  // State pour stocker les episodes de la saison
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    //Requete vers la BDD pour avoir les épisodes de la saison dans l'ordre croissant
    const idSeason = 'Saison ' + numSeason
    const unsubscribe = onSnapshot(
      query(
        collection(
          db,
          'Utilisateurs',
          idUserConnected,
          'Series',
          nameSeries,
          'Saisons',
          idSeason,
          'Episodes'
        ),
        orderBy('numEpisode')
      ),
      (episode) => {
        setEpisodes(episode.docs.map((doc) => doc.data()))
      }
    )
    return unsubscribe
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageContainer>
      <TitleDiv>
        <TitleText>
          Mes Séries - {nameSeries} - Saison {numSeason}{' '}
        </TitleText>
      </TitleDiv>
      <EpisodesWrap>
        {episodes.map((episode, index) => (
          <EpisodeCard
            key={`${episode.numEpisode}-${index}`}
            photoEpisode={episode.imageEpisode}
            numEpisode={episode.numEpisode}
            nomEpisode={episode.nomEpisode}
            resumeEpisode={episode.resumeEpisode}
            numSaison={episode.numSaison}
            nomSerie={episode.nomSerie}
            dateEpisode={episode.dateEpisode}
          />
        ))}
      </EpisodesWrap>
    </PageContainer>
  )
}
