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
  PictureStyle,
  SecondDateInfo,
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

  console.log(episode)
  console.log(checkedEpisode)

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
  //console.log(count)

  let DeleteEpisode = false
  if (count <= 0) {
    DeleteEpisode = true
  }

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

    if (checkedEpisode[0] === true) {
      console.log('avant le set', checkedEpisode)
      console.log('checkEpisode false')
      setCheckEpisode([false])
      console.log('apres le set', checkedEpisode)
      // Mettre à jour la variable estRegarde de l'episode
      updateDoc(EpisodeMajRef, { estRegarde: false })

      //Mettre à jour le nombre d'episode regardé pour la saison
      const currentSeason = await getDoc(SaisonMajRef)
      let numberEpisodesWatchedSeason = 0
      if (currentSeason.exists()) {
        console.log('Document data:', currentSeason.data())
        numberEpisodesWatchedSeason = currentSeason.data().nombreEpisodeRegarde
        console.log(numberEpisodesWatchedSeason)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
      console.log('avant update', numberEpisodesWatchedSeason)
      updateDoc(SaisonMajRef, {
        nombreEpisodeRegarde: numberEpisodesWatchedSeason - 1,
      })

      //Mettre à jour le nombre d'episode regardé pour la série
      const currentSeries = await getDoc(SerieMajRef)
      let numberEpisodesWatched = 0
      if (currentSeries.exists()) {
        numberEpisodesWatched = currentSeries.data().nombreEpisodeRegarde
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
      console.log('avant update', numberEpisodesWatched)
      updateDoc(SerieMajRef, {
        nombreEpisodeRegarde: numberEpisodesWatched - 1,
      })
    }
    if (checkedEpisode[0] === false) {
      console.log('avant le set', checkedEpisode)
      console.log('checkEpisode true')
      setCheckEpisode([true])
      console.log('apres le set', checkedEpisode)
      // Mettre à jour la variable estRegarde de l'episode
      updateDoc(EpisodeMajRef, { estRegarde: true })

      //Mettre à jour le nombre d'episode regardé pour la saison
      const currentSeason = await getDoc(SaisonMajRef)
      let numberEpisodesWatchedSeason = 0
      if (currentSeason.exists()) {
        console.log('Document data:', currentSeason.data())
        numberEpisodesWatchedSeason = currentSeason.data().nombreEpisodeRegarde
        console.log(numberEpisodesWatchedSeason)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
      console.log('avant update', numberEpisodesWatchedSeason)
      updateDoc(SaisonMajRef, {
        nombreEpisodeRegarde: numberEpisodesWatchedSeason + 1,
      })

      //Mettre à jour le nombre d'episode regardé pour la série
      const currentSeries = await getDoc(SerieMajRef)
      let numberEpisodesWatched = 0
      if (currentSeries.exists()) {
        numberEpisodesWatched = currentSeries.data().nombreEpisodeRegarde
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
      console.log('avant update', numberEpisodesWatched)
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
