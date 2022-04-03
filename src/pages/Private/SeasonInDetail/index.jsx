import React from 'react'
import { useLocation } from 'react-router-dom'

import { TitleDiv, TitleText } from '../MySeriesInDetail/style'
import EpisodeCard from '../../../components/EpisodeCard'
import { EpisodesWrap } from './style'
import { useState, useEffect, useContext } from 'react'
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from 'firebase/firestore'

import { UserContext } from '../../../utils/Usercontext'
import { db } from '../../../firebase-config'

export default function SeasonInDetail() {
  const { state } = useLocation()
  const numSeason = state.numSeason
  const nameSeries = state.idSerie
  const { currentUser } = useContext(UserContext) //Recupere les informations sur l'utilisateur connecté
  const idUserConnected = currentUser.uid

  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
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
        //where('numSeason', '==', numSeason),
        orderBy('numEpisode')
      ),
      (episode) => {
        setEpisodes(episode.docs.map((doc) => doc.data()))
        //console.log(episode.docs.map((doc) => doc.data()))
      }
    )
    return unsubscribe
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
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
          />
        ))}
      </EpisodesWrap>
    </div>
  )
}
