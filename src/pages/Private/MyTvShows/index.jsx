import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../utils/Usercontext'
import axios from 'axios'

import {
  getAllSerieByUser,
  addSeries,
  addSeasons,
} from '../../../database/FunctionsDatabase'

//Components
import SerieInList from '../../../components/SeriesInList'

//Style
import { TitlePage } from './style'

export default function MyTvShows() {
  const { currentUser } = useContext(UserContext)
  const idUserConnected = currentUser.uid
  const [series, setSeries] = useState([])

  const [serieAAjouter, setAAjouter] = useState([])
  const [chaineSerie, setChaineSerie] = useState([])

  useEffect(() => {
    getSeries()
  }, [])

  // Recupere la liste des séries de l'utilisateur

  const getSeries = async () => {
    const data = await getAllSerieByUser(idUserConnected)
    setSeries(data.docs.map((doc) => ({ ...doc.data() })))
  }

  // Test avec Daredevil

  useEffect(() => {
    getShows(67744)
  }, [])

  const getShows = async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR`
    )
    console.log(data)
    setAAjouter(data)
    setChaineSerie(data.networks[0].name)
  }

  console.log('Serie', serieAAjouter)
  console.log('Chaine', chaineSerie)

  const SerieDardevil = {
    nomSerie: serieAAjouter.name,
    //nomChaine: serieAAjouter?.networks[0].name,
    nomChaine: chaineSerie,
    nombreSaisons: serieAAjouter?.number_of_seasons,
    nombreEpisode: serieAAjouter?.number_of_episodes,
    nombreEpisodeRegarde: 1,
    imageSerie: 'http://image.tmdb.org/t/p/w500/' + serieAAjouter?.poster_path,
  }

  addSeries(idUserConnected, SerieDardevil)

  return (
    <div>
      <TitlePage>Mes Séries</TitlePage>
      <div>
        {series.map((serie, index) => (
          <SerieInList
            key={`${serie.nomSerie}-${index}`}
            imageSerie={serie.imageSerie}
            nomSerie={serie.nomSerie}
            nombreSaisons={serie.nombreSaisons}
            chaineSerie={serie.nomChaine}
            nombreEpisode={serie.nombreEpisode}
            nombreEpisodeRegarde={serie.nombreEpisodeRegarde}
          />
        ))}
      </div>
    </div>
  )
}
