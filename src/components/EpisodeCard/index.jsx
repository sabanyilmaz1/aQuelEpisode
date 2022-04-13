import React from 'react'
import { useState, useContext } from 'react'
import {
  CheckWrapper,
  DateSortieStyle,
  DateStyle,
  EpisodeWrap,
  FirstDateContainer,
  FirstInfo,
  FirstInfoContainer,
  InfoDiv,
  NoOverwiewWrapper,
  PictureStyle,
  SecondInfo,
} from './style'

import { db } from '../../firebase-config'
import { UserContext } from '../../utils/Usercontext'
import { useEffect } from 'react'
import {
  onSnapshot,
  query,
  collection,
  where,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore'

export default function EpisodeCard({
  numEpisode,
  nomEpisode,
  resumeEpisode,
  photoEpisode,
  numSaison,
  nomSerie,
  dateEpisode,
}) {
  const [checkedEpisode, setCheckEpisode] = useState([false])
  const [isReleased, setIsReleased] = useState([false])
  const [episode, setEpisode] = useState()

  //Recupere les informations sur l'utilisateur connecté
  const { currentUser } = useContext(UserContext)
  const idUserConnected = currentUser.uid

  useEffect(() => {
    const idSeason = 'Saison ' + numSaison
    const unsubscribe = onSnapshot(
      query(
        collection(
          db,
          'Utilisateurs',
          idUserConnected,
          'Series',
          nomSerie,
          'Saisons',
          idSeason,
          'Episodes'
        ),
        where('numEpisode', '==', numEpisode)
      ),
      (episode) => {
        setEpisode(episode.docs.map((doc) => doc.data()))
        setCheckEpisode(episode.docs.map((doc) => doc.data().estRegarde))
        setIsReleased(episode.docs.map((doc) => doc.data().estSorti))
      }
    )
    return unsubscribe
  }, [])

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

  const handleClick = async () => {
    const idSeason = 'Saison ' + numSaison
    const idEpisode = 'Episode ' + numEpisode

    const EpisodeMajRef = doc(
      db,
      'Utilisateurs',
      idUserConnected,
      'Series',
      nomSerie,
      'Saisons',
      idSeason,
      'Episodes',
      idEpisode
    )

    const SaisonMajRef = doc(
      db,
      'Utilisateurs',
      idUserConnected,
      'Series',
      nomSerie,
      'Saisons',
      idSeason
    )

    const SerieMajRef = doc(
      db,
      'Utilisateurs',
      idUserConnected,
      'Series',
      nomSerie
    )

    // Pour décocher un episode coché par erreur
    if (checkedEpisode[0] === true) {
      //on modifie le state pour decocher l'episode
      setCheckEpisode([false])

      // Les variables pour stocker les données
      let numberEpisodesWatchedSeason = 0
      let numberOfEpisodes = 0
      let numberEpisodesWatched = 0
      let numCurrentEpisode = 0

      //On fait appel à la BD pour récuperer certaines données
      const currentSeason = await getDoc(SaisonMajRef)
      if (currentSeason.exists()) {
        console.log('Document data:', currentSeason.data())
        numberEpisodesWatchedSeason = currentSeason.data().nombreEpisodeRegarde
        numberOfEpisodes = currentSeason.data().nombreEpisode
      }

      const currentSeries = await getDoc(SerieMajRef)
      if (currentSeries.exists()) {
        numberEpisodesWatched = currentSeries.data().nombreEpisodeRegarde
      }

      const currentEpisodes = await getDoc(EpisodeMajRef)
      if (currentEpisodes.exists()) {
        numCurrentEpisode = currentEpisodes.data().numEpisode
      }

      //Modifications des variables dans la BD
      if (numCurrentEpisode === numberOfEpisodes) {
        updateDoc(EpisodeMajRef, { estRegarde: false })
        updateDoc(SaisonMajRef, { estRegarde: false })
      } else {
        updateDoc(EpisodeMajRef, { estRegarde: false })
      }
      updateDoc(SaisonMajRef, {
        nombreEpisodeRegarde: numberEpisodesWatchedSeason - 1,
      })
      updateDoc(SerieMajRef, {
        nombreEpisodeRegarde: numberEpisodesWatched - 1,
      })
    }

    //Pour cocher un episode
    if (checkedEpisode[0] === false) {
      setCheckEpisode([true])

      // Les variables pour stocker les données
      let numberEpisodesWatchedSeason = 0
      let numberOfEpisodes = 0
      let numberEpisodesWatched = 0
      let numCurrentEpisode = 0

      //On fait appel à la BD pour récuperer certaines données
      const currentSeason = await getDoc(SaisonMajRef)
      if (currentSeason.exists()) {
        console.log('Document data:', currentSeason.data())
        numberEpisodesWatchedSeason = currentSeason.data().nombreEpisodeRegarde
        numberOfEpisodes = currentSeason.data().nombreEpisode
      }

      const currentSeries = await getDoc(SerieMajRef)
      if (currentSeries.exists()) {
        numberEpisodesWatched = currentSeries.data().nombreEpisodeRegarde
      }

      const currentEpisodes = await getDoc(EpisodeMajRef)
      if (currentEpisodes.exists()) {
        numCurrentEpisode = currentEpisodes.data().numEpisode
      }

      //Modifications des variables dans la BD
      if (numCurrentEpisode === numberOfEpisodes) {
        updateDoc(EpisodeMajRef, { estRegarde: true })
        updateDoc(SaisonMajRef, { estRegarde: true })
      } else {
        updateDoc(EpisodeMajRef, { estRegarde: true })
      }
      updateDoc(SaisonMajRef, {
        nombreEpisodeRegarde: numberEpisodesWatchedSeason + 1,
      })
      updateDoc(SerieMajRef, {
        nombreEpisodeRegarde: numberEpisodesWatched + 1,
      })
    }
  }

  return (
    <>
      {isReleased[0] && (
        <EpisodeWrap>
          <PictureStyle src={photoEpisode} alt="ImageEpisode" />
          <InfoDiv>
            <FirstInfo>
              Episode {numEpisode} - {nomEpisode}
            </FirstInfo>

            <FirstInfoContainer>
              <SecondInfo>{resumeEpisode}</SecondInfo>
            </FirstInfoContainer>

            {resumeEpisode === '' && (
              <NoOverwiewWrapper>
                <SecondInfo>Pas de résumé disponible</SecondInfo>
              </NoOverwiewWrapper>
            )}
          </InfoDiv>
          <CheckWrapper>
            <input
              type="checkbox"
              checked={checkedEpisode[0]}
              value={checkedEpisode[0]}
              onChange={handleClick}
            />
          </CheckWrapper>
        </EpisodeWrap>
      )}

      {!isReleased[0] && (
        <EpisodeWrap>
          <PictureStyle
            src={
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019'
            }
            alt="ImageEpisode"
          />

          <InfoDiv>
            <FirstInfo>Episode {numEpisode}</FirstInfo>

            <FirstDateContainer>
              <DateStyle>
                {' '}
                <DateSortieStyle>Date de sortie </DateSortieStyle> : {dateEpStr}{' '}
                ( {count} Jours)
              </DateStyle>
            </FirstDateContainer>
          </InfoDiv>
        </EpisodeWrap>
      )}
    </>
  )
}
