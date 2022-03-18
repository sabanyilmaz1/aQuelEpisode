import React, { useContext, useEffect, useState } from 'react'

import {
  FirstContainer,
  InfoDiv,
  OverviewDiv,
  OverviewStyle,
  PictureAndProgressDiv,
  PictureStyle,
  SecondContainer,
  SeriesInfo,
  SeriesTitle,
  TitleDiv,
  TitleText,
  WrapTwoContainer,
} from './style'

import SeasonCard from '../../../components/SeasonCard'

import { useLocation } from 'react-router-dom'
import { UserContext } from '../../../utils/Usercontext'

import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../../firebase-config'

export default function MySeriesInDetail() {
  const { state } = useLocation()
  const id = state.data

  const { currentUser } = useContext(UserContext)
  const idUserConnected = currentUser.uid
  const [series, setSeries] = useState([])
  const [seasons, setSeasons] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'Utilisateurs', idUserConnected, 'Series'),
        where('nomSerie', '==', id)
      ),
      (serie) => {
        setSeries(serie.docs.map((doc) => doc.data()))
      }
    )
    return unsubscribe
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Recupere la liste des séries de l'utilisateur non terminés
    const unsubscribe = onSnapshot(
      query(
        collection(
          db,
          'Utilisateurs',
          idUserConnected,
          'Series',
          id,
          'Saisons'
        ),
        orderBy('numSaison')
      ),
      (season) => {
        setSeasons(season.docs.map((doc) => doc.data()))
      }
    )
    return unsubscribe
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //console.log(series)
  //console.log(seasons)

  return (
    <div>
      <TitleDiv>
        <TitleText>Mes Séries - {id} </TitleText>
      </TitleDiv>
      <WrapTwoContainer>
        <FirstContainer>
          <PictureAndProgressDiv>
            <PictureStyle src={series[0]?.imageSerie} />
            <InfoDiv>
              <SeriesTitle>{series[0]?.nomSerie}</SeriesTitle>
              <SeriesInfo>
                {series[0]?.nombreSaisons} SAISONS - {series[0]?.nomChaine}
              </SeriesInfo>
              <OverviewDiv>
                <OverviewStyle>{series[0]?.resumeSerie}</OverviewStyle>
              </OverviewDiv>
            </InfoDiv>
          </PictureAndProgressDiv>
        </FirstContainer>
        <SecondContainer>
          {seasons.map((season, index) => (
            <SeasonCard
              key={`${season.numSaison}-${index}`}
              numSeason={season.numSaison}
              numMaxEpisode={season.nombreEpisode}
              numEpisode={season.nombreEpisodeRegarde}
              idSerie={season.nomSerie}
            />
          ))}
        </SecondContainer>
      </WrapTwoContainer>
    </div>
  )
}
