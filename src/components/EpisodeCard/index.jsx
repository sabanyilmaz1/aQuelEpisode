import React from 'react'
import { useState, useContext } from 'react'
import {
  CheckWrapper,
  EpisodeWrap,
  FirstInfo,
  FirstInfoContainer,
  InfoDiv,
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
}) {
  const [checkedEpisode, setCheckEpisode] = useState([false])
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
      }
    )
    return unsubscribe
  }, [])

  console.log(episode)
  console.log(checkedEpisode)

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

    /*
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

    if (checkedEpisode) {
      console.log('cocher')
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
    */
  }

  return (
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
  )
}
