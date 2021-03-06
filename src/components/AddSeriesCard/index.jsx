import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { UserContext } from '../../utils/Usercontext'

import {
  addSeries,
  addSeasons,
  addEpisodes,
} from '../../database/FunctionsDatabase'

import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase-config'

//Style
import {
  SerieContainer,
  SerieTitle,
  PictureSerie,
  AddBtn,
  AddText,
  TitleBtn,
  PageContainer,
} from './style'

//Component
import AddSeriesDetailCard from '../../components/AddSeriesDetailCard'

export default function AddSeriesCard({ nameSerie, posterLink, idSerie }) {
  const [series, setSeries] = useState([])

  useEffect(() => {
    // Recupere la liste des séries de l'utilisateur
    const unsubscribe = onSnapshot(
      collection(db, 'Utilisateurs', idUserConnected, 'Series'),
      (serie) => {
        setSeries(serie.docs.map((doc) => doc.data()))
      }
    )
    return unsubscribe
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //Recupere certains states et certaines fonctions du UserContext
  const {
    currentUser,
    toogleDetails,
    detailsVisible,
    setIdSeries,
  } = useContext(UserContext)

  //L'identifiant firebase de l'utilisateur connecté
  const idUserConnected = currentUser.uid

  const IMG_API = 'http://image.tmdb.org/t/p/w500'
  let imageSerie = IMG_API + posterLink
  if (posterLink == null) {
    imageSerie =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019'
  }

  // Cette fonction recupere les informations necessaires sur la série selectionnée à l'aide de l'id de la série cliqué et les envoies dans la base de donnée
  const getSeries = async (id) => {
    const reponseApiSeries = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR`
    )
    //Recupere les données sous format JSON de la requete API reponseApiSeries
    const dataSerie = reponseApiSeries.data

    // Attribut à ajouter dans la base de données
    const nomSerie = dataSerie.name
    const nomChaine = dataSerie.networks[0].name
    const nombreSaisons = dataSerie.number_of_seasons
    const nombreEpisode = dataSerie.number_of_episodes
    const imageSerie =
      'http://image.tmdb.org/t/p/w500/' + dataSerie?.poster_path
    const resumeSerie = dataSerie.overview

    // Ajout de la série dans la base de donnée
    const Serie = {
      nomSerie,
      nomChaine,
      nombreSaisons,
      nombreEpisode,
      nombreEpisodeRegarde: 0,
      imageSerie,
      resumeSerie,
      estTermine: false,
    }
  
    addSeries(idUserConnected, Serie)

    // Ajout des saisons de la série selectionnée
    const seasonsSerie = dataSerie.seasons

    // Certaines série sur TMDB API ont une saison 0 que je ne garde pas
    if (seasonsSerie[0].name === 'Épisodes spéciaux') {
      // Attribut à mettre dans la base de données

      for (let i = 1; i < dataSerie.number_of_seasons + 1; i++) {
        const numSaison = seasonsSerie[i].season_number
        const nombreEpisode = seasonsSerie[i].episode_count
        const estRegarde = false
        const Saison = {
          numSaison,
          nombreEpisode,
          estRegarde,
          nombreEpisodeRegarde: 0,
          nomSerie,
        }

        addSeasons(idUserConnected, Serie.nomSerie, Saison)

        // Ajout des épisodes

        //Requete GET API pour avoir les informations sur chaque saison et ajouter les informations nécessaires
        const reponseAPI = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/season/${numSaison}?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR`
        )
        const dataSeason = reponseAPI.data.episodes
        for (let j = 0; j < nombreEpisode; j++) {
          const numEpisode = dataSeason[j].episode_number
          const dateEpisode = dataSeason[j].air_date
          const nomEpisode = dataSeason[j].name
          const resumeEpisode = dataSeason[j].overview
          const imageEpisode =
            'http://image.tmdb.org/t/p/w500/' + dataSeason[j]?.still_path
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
            resumeEpisode,
            imageEpisode,
            nomSerie,
            numSaison: seasonsSerie[i].season_number,
            imageSerie,
          }
          addEpisodes(idUserConnected, Serie.nomSerie, Saison, Episode)
        }
      }
    } else {
      for (let i = 0; i < dataSerie.number_of_seasons; i++) {
        const numSaison = seasonsSerie[i].season_number
        const nombreEpisode = seasonsSerie[i].episode_count
        const estRegarde = false

        const Saison = {
          numSaison,
          nombreEpisode,
          estRegarde,
          nombreEpisodeRegarde: 0,
          nomSerie,
        }
        addSeasons(idUserConnected, Serie.nomSerie, Saison)

        // Ajout des épisodes
        const reponseApiSeason = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/season/${numSaison}?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR`
        )
        const dataSeason = reponseApiSeason.data.episodes
        // On recupere les informations necessaires pour chaque episode
        for (let j = 0; j < nombreEpisode; j++) {
          const numEpisode = dataSeason[j].episode_number
          const dateEpisode = dataSeason[j].air_date
          const nomEpisode = dataSeason[j].name
          const resumeEpisode = dataSeason[j].overview
          const imageEpisode =
            'http://image.tmdb.org/t/p/w500/' + dataSeason[j]?.still_path
          
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
            resumeEpisode,
            imageEpisode,
            nomSerie,
            numSaison: seasonsSerie[i].season_number,
            imageSerie,
          }
          addEpisodes(idUserConnected, Serie.nomSerie, Saison, Episode)
        }
      }
    }
  }

  // la fonction executée lorsqu'on clique sur "Ajouter la série"
  const AddSeriesInList = () => {
    const id_series = idSerie
    const name_series = nameSerie
    const seriesFound = series.find((show) => show.nomSerie === name_series)
    //On ajoute la série seulement si cette série n'est pas deja dans la liste des séries
    if (seriesFound !== undefined) {
      alert('Erreur : Cette série est deja ajouté dans votre liste')
    } else {
      alert(`Vous avez ajouté la série : ${nameSerie} à votre liste de séries`)
      getSeries(id_series)
    }
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

  // La fonction toogleDetail permet d'afficher la fenetre modale pour afficher les details de la série
  const toogleDetailsSeries = () => {
    toogleDetails('afficheDetails')
    setIdSeries(idSerie)
  }


  return (
    <div>
      <PageContainer>
        <SerieContainer>
          <PictureSerie src={imageSerie} alt={nameSerie} />
          <TitleBtn onClick={() => toogleDetailsSeries()}>
            <SerieTitle> {nameSerie}</SerieTitle>
          </TitleBtn>
          <AddBtn onClick={() => AddSeriesInList()}>
            <AddText>Ajouter la série</AddText>
          </AddBtn>
        </SerieContainer>
      </PageContainer>
      {detailsVisible && <AddSeriesDetailCard />}
    </div>
  )
}
