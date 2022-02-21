import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import { UserContext } from '../../utils/Usercontext'

import {
  addSeries,
  addSeasons,
  addEpisodes,
  getAllSerieByUser,
} from '../../database/FunctionsDatabase'

//Style
import { SerieContainer, TextSpan, ImageSerie, BtnAdd, AddSpan } from './style'

export default function SerieInAddList({ nomSerie, lienPoster, idSerie }) {
  const { currentUser } = useContext(UserContext)
  const idUserConnected = currentUser.uid

  const IMG_API = 'http://image.tmdb.org/t/p/w500'
  let imageSerie = ''
  if (lienPoster == null) {
    imageSerie =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019'
  } else {
    imageSerie = IMG_API + lienPoster
  }

  // Cette fonction recupere les informations necessaires sur la série selectionnée et les envoies dans la base de donnée
  const getShow = async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR`
    )
    console.log(data)
    const nomSerie = data.name
    const nomChaine = data.networks[0].name
    const nombreSaisons = data.number_of_seasons
    const nombreEpisode = data.number_of_episodes
    const imageSerie = 'http://image.tmdb.org/t/p/w500/' + data?.poster_path
    const resumeSerie = data.overview

    // Ajout de la série dans la base de donnée
    const Serie = {
      nomSerie,
      nomChaine,
      nombreSaisons,
      nombreEpisode,
      nombreEpisodeRegarde: 0,
      imageSerie,
      resumeSerie,
    }
    console.log('Serie', Serie)
    addSeries(idUserConnected, Serie)

    // Ajout des saisons de la série selectionnée
    const saisonsSerie = data.seasons

    if (saisonsSerie[0].name === 'Épisodes spéciaux') {
      for (let i = 1; i < data.number_of_seasons + 1; i++) {
        console.log(`Saison ${i}`, saisonsSerie[i])
        const numSaison = saisonsSerie[i].season_number
        const nombreEpisode = saisonsSerie[i].episode_count
        const estRegarde = false

        const Saison = { numSaison, nombreEpisode, estRegarde }

        addSeasons(idUserConnected, Serie.nomSerie, Saison)

        // Ajout des épisodes
        const reponseAPI = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/season/${numSaison}?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR`
        )
        const dataSaison = reponseAPI.data.episodes
        for (let j = 0; j < nombreEpisode; j++) {
          const numEpisode = dataSaison[j].episode_number
          const dateEpisode = dataSaison[j].air_date
          const nomEpisode = dataSaison[j].name

          //l'attribut estSortie
          const DateNow = new Date()
          const dateNowInFormat = formatDate(DateNow)
          const estSorti = dateEpisode > dateNowInFormat ? false : true

          const Episode = {
            numEpisode,
            nomEpisode,
            dateEpisode,
            estRegarde: false,
            estSorti,
          }
          addEpisodes(idUserConnected, Serie.nomSerie, Saison, Episode)
          console.log(`Episode ${j + 1}`, Episode)
        }
      }
    } else {
      for (let i = 0; i < data.number_of_seasons; i++) {
        console.log(`Saison ${i + 1}`, saisonsSerie[i])
        const numSaison = saisonsSerie[i].season_number
        const nombreEpisode = saisonsSerie[i].episode_count
        const estRegarde = false

        const Saison = { numSaison, nombreEpisode, estRegarde }
        addSeasons(idUserConnected, Serie.nomSerie, Saison)

        // Ajout des épisodes
        const reponseAPI = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/season/${numSaison}?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR`
        )
        const dataSaison = reponseAPI.data.episodes
        // On recupere les informations necessaires pour chaque episode

        for (let j = 0; j < nombreEpisode; j++) {
          const numEpisode = dataSaison[j].episode_number
          const dateEpisode = dataSaison[j].air_date
          const nomEpisode = dataSaison[j].name

          //l'attribut estSortie
          const DateNow = new Date()
          const dateNowInFormat = formatDate(DateNow)
          const estSorti = dateEpisode > dateNowInFormat ? false : true

          const Episode = {
            numEpisode,
            nomEpisode,
            dateEpisode,
            estRegarde: false,
            estSorti,
          }
          addEpisodes(idUserConnected, Serie.nomSerie, Saison, Episode)
          console.log(`Episode ${j + 1}`, Episode)
        }
      }
    }
  }

  // la fonction executée lorsqu'on clique sur "Ajouter la série"
  const AddShowInList = () => {
    const idShow = idSerie
    getShow(idShow)
  }

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
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
