import React, { useEffect } from 'react'
import { useContext } from 'react'

import {
  CardContainer,
  CenterDiv,
  CloseBtn,
  CloseDiv,
  Element,
  LeftDiv,
  OverviewSeries,
  PictureSeries,
  TitleSerie,
  GenreSerie,
  OverviewDiv,
  OverviewTitle,
  InformationTitle,
  InfoText,
} from './style'

import { UserContext } from '../../utils/Usercontext'
import close from '../../assets/close.svg'
import axios from 'axios'
import { useState } from 'react/cjs/react.development'

export default function AddSeriesDetailCard() {
  const { toogleDetails, idSeriesDetails } = useContext(UserContext)

  const [series, setSeries] = useState([])
  const [genres, setGenres] = useState([])
  const [network, setNetwork] = useState([])

  useEffect(() => {
    getData()
  }, [])
  console.log(series)
  async function getData() {
    const reponse = await axios.get(
      `https://api.themoviedb.org/3/tv/${idSeriesDetails}?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR`
    )
    setSeries(reponse.data)
    setGenres(reponse.data.genres)
    setNetwork(reponse.data.networks[0])
  }

  const pictureSeries = 'http://image.tmdb.org/t/p/w500/' + series?.poster_path
  const nameSeries = series.name
  const overviewSeries = series.overview

  //Informations sur la série

  const countrySeries = series.origin_country
  const channelSeries = network.name
  const nbEpisodes = series.number_of_episodes
  const nbSeasons = series.number_of_seasons

  const firstAir = series.first_air_date
  const lastAir = series.last_air_date

  return (
    <div>
      <CardContainer>
        <LeftDiv>
          <PictureSeries src={pictureSeries} alt="photoSérie" />
          <TitleSerie>{nameSeries}</TitleSerie>
          {genres.map((genre) => (
            <GenreSerie key={genre.id}>{genre.name}</GenreSerie>
          ))}
        </LeftDiv>
        <CenterDiv>
          <OverviewTitle>Synopsis</OverviewTitle>
          <OverviewDiv>
            <OverviewSeries>{overviewSeries}</OverviewSeries>
          </OverviewDiv>
          <InformationTitle>Informations sur la série</InformationTitle>
          <InfoText>Pays : {countrySeries}</InfoText>
          <InfoText>Chaine : {channelSeries}</InfoText>
          <InfoText>Nombre d'épisodes : {nbEpisodes}</InfoText>
          <InfoText>Nombre de saisons : {nbSeasons}</InfoText>
          <InfoText>
            Diffusion : {firstAir} - {lastAir}
          </InfoText>
        </CenterDiv>

        <CloseDiv>
          <CloseBtn onClick={() => toogleDetails('fermeDetails')}>
            <img src={close} alt="close" />
          </CloseBtn>
        </CloseDiv>
      </CardContainer>
    </div>
  )
}
