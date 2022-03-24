import React from 'react'
import { useState, useEffect, useContext } from 'react'
import {
  CountStyle,
  DateContainer,
  DateStyle,
  EpisodeWrap,
  FirstInfo,
  FirstInfoContainer,
  InfoContainer,
  PhotoContainer,
  PictureStyle,
  SecondContainer,
  SecondInfo,
} from './style'

import { where, onSnapshot, query, collection } from 'firebase/firestore'
import { UserContext } from '../../utils/Usercontext'
import { db } from '../../firebase-config'

export default function ComingSoonCard({
  nomSerie,
  numSaison,
  numEpisode,
  dateEpisode,
}) {
  const [picture, setPicture] = useState([])
  const { currentUser } = useContext(UserContext) //Recupere les informations sur l'utilisateur connecté
  const idUserConnected = currentUser.uid
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'Utilisateurs', idUserConnected, 'Series'),
        where('nomSerie', '==', nomSerie)
      ),
      (serie) => {
        setPicture(serie.docs.map((doc) => doc.data()))
      }
    )
    return unsubscribe
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  console.log(dateEpisode)
  const years = Number(dateEpisode.substring(0, 4))
  const month = Number(dateEpisode.substring(5, 7))
  const day = Number(dateEpisode.substring(8, 10))
  const dateEp = new Date(Date.UTC(years, month - 1, day, 3, 0, 0))
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const dateEpStr = dateEp.toLocaleDateString('fr-FR', options)
  //console.log(dateEpStr)

  const dateNow = new Date()
  const count = parseInt(
    (dateEp.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24) + 1
  )
  console.log(count)

  let DeleteEpisode = false
  if (count < 0) {
    DeleteEpisode = true
  }

  return (
    <div>
      {!DeleteEpisode && (
        <EpisodeWrap>
          <PhotoContainer>
            <PictureStyle src={picture[0]?.imageSerie} />
          </PhotoContainer>
          <InfoContainer>
            <FirstInfoContainer>
              <FirstInfo>{nomSerie}</FirstInfo>
            </FirstInfoContainer>

            <SecondContainer>
              <SecondInfo>
                Saison {numSaison} - Episode {numEpisode}
              </SecondInfo>
            </SecondContainer>
          </InfoContainer>
          <DateContainer>
            <CountStyle>{count} J</CountStyle>
            <DateStyle>{dateEpStr}</DateStyle>
          </DateContainer>
        </EpisodeWrap>
      )}
    </div>
  )
}
