import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { UserContext } from '../../utils/Usercontext'

import { addSeries } from '../../database/FunctionsDatabase'

//Style
import { SerieContainer, TextSpan, ImageSerie, BtnAdd, AddSpan } from './style'

export default function SerieInAddList({ nomSerie, lienPoster, idSerie }) {
  const { currentUser } = useContext(UserContext)
  const idUserConnected = currentUser.uid

  const [serieAAjouter, setAAjouter] = useState([])
  const [chaineSerie, setChaineSerie] = useState([])
  const [saisonSerie, setSaisonSerie] = useState([])

  const IMG_API = 'http://image.tmdb.org/t/p/w500'
  let imageSerie = ''
  if (lienPoster == null) {
    imageSerie =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019'
  } else {
    imageSerie = IMG_API + lienPoster
  }

  const getShow = async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR`
    )
    console.log(data)
    setAAjouter(data)
    setChaineSerie(data.networks[0].name)
    setSaisonSerie(data.seasons)
  }

  const AddShowInList = () => {
    const idShow = idSerie
    getShow(idShow)
    console.log('Serie', serieAAjouter)
    console.log('Chaine', chaineSerie)
    console.log('Saisons', saisonSerie)

    const Show = {
      nomSerie: serieAAjouter.name,
      nomChaine: chaineSerie,
      nombreSaisons: serieAAjouter?.number_of_seasons,
      nombreEpisode: serieAAjouter?.number_of_episodes,
      nombreEpisodeRegarde: 1,
      imageSerie:
        'http://image.tmdb.org/t/p/w500/' + serieAAjouter?.poster_path,
    }

    //addSeries(idUserConnected, Show)

    for (let i = 0; i < serieAAjouter.number_of_seasons; i++) {
      console.log(`Saison ${i + 1} :`, saisonSerie[i].episode_count)
    }
  }

  return (
    <div>
      <SerieContainer>
        <ImageSerie src={imageSerie} alt={nomSerie} />

        <TextSpan> {nomSerie}</TextSpan>
        <BtnAdd onClick={() => AddShowInList()}>
          <AddSpan>Ajouter la série</AddSpan>
        </BtnAdd>
      </SerieContainer>
    </div>
  )
}
