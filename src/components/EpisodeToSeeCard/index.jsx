import React, { useState, useEffect, useContext } from 'react'
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from 'firebase/firestore'

import { db } from '../../firebase-config'
import { UserContext } from '../../utils/Usercontext'
import {
  CardDiv,
  CheckboxContainer,
  ClickedHere,
  ClickedSpan,
  ClickedStyle,
  FirstInfoContainer,
  InfoContainer,
  InfoText,
  PictureStyle,
  ResumeStyle,
  ResumeWrapper,
  SecondContainer,
  SeriesTitle,
  ThirdContainer,
} from './style'

import './style.css'

import LoaderEpisode from '../../assets/loaderEpisode.gif'

export default function EpisodeToSeeCard({ nameSeries, pictureSeries }) {
  //Recupere les informations sur l'utilisateur connecté
  const { currentUser } = useContext(UserContext)
  const idUserConnected = currentUser.uid

  const [series, setSeries] = useState([{}])
  const [seasons, setSeasons] = useState([{}])
  const [episodes, setEpisodes] = useState([{}])
  const [numSeason, setNumSeason] = useState([])
  const [numEpisode, setNumEpisode] = useState([])

  //State pour le checkbox
  const [checked, setChecked] = useState(false)

  // State pour le timer
  const [seconds, setSeconds] = useState(0)

  const handleClick = () => {
    setChecked(!checked)
    setSeconds(0)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'Utilisateurs', idUserConnected, 'Series'),
        where('nomSerie', '==', nameSeries)
      ),
      (serie) => {
        setSeries(serie.docs.map((doc) => doc.data()))
      }
    )
    return unsubscribe
  }, [idUserConnected, nameSeries])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(
          db,
          'Utilisateurs',
          idUserConnected,
          'Series',
          nameSeries,
          'Saisons'
        ),
        where('estRegarde', '==', false),
        orderBy('numSaison')
      ),
      (season) => {
        setSeasons(season.docs.map((doc) => doc.data()))
        setNumSeason(season.docs.map((doc) => doc.data().numSaison))
      }
    )
    return unsubscribe
  }, [series]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(
          db,
          'Utilisateurs',
          idUserConnected,
          'Series',
          nameSeries,
          'Saisons',
          `Saison ${numSeason[0]}`,
          'Episodes'
        ),
        where('estRegarde', '==', false),
        where('estSorti', '==', true),
        orderBy('numEpisode')
      ),
      (episode) => {
        setEpisodes(episode.docs.map((doc) => doc.data()))
        setNumEpisode(episode.docs.map((doc) => doc.data().numEpisode))
      }
    )
    return unsubscribe
  }, [numSeason]) // eslint-disable-line react-hooks/exhaustive-deps

  //Mettre à jour la BD

  useEffect(() => {
    let estTermine = false
    if (checked) {
      // console.log('checked-numEp(0)', numEpisode[0])
      //console.log('checked-seasons.nbEp', seasons[0].nombreEpisode)

      if (numEpisode[0] === seasons[0].nombreEpisode) {
        const SerieMajRef = doc(
          db,
          'Utilisateurs',
          idUserConnected,
          'Series',
          nameSeries
        )
        const SaisonMajRef = doc(
          db,
          'Utilisateurs',
          idUserConnected,
          'Series',
          nameSeries,
          'Saisons',
          `Saison ${numSeason[0]}`
        )
        const compteur = series[0].nombreEpisodeRegarde
        const compteurSeason = seasons[0].nombreEpisodeRegarde

        updateDoc(SerieMajRef, { nombreEpisodeRegarde: compteur + 1 })
        updateDoc(SaisonMajRef, { nombreEpisodeRegarde: compteurSeason + 1 })
        //Saison Terminée
        //Mettre à jour la saison sur la BD

        updateDoc(SaisonMajRef, {
          estRegarde: true,
          nombreEpisodeRegarde: compteurSeason + 1,
        })
      } else if (numEpisode[0] !== seasons[0].nombreEpisode) {
        //Saison non terminée
        const SaisonMajRef = doc(
          db,
          'Utilisateurs',
          idUserConnected,
          'Series',
          nameSeries,
          'Saisons',
          `Saison ${numSeason[0]}`
        )

        const EpisodeMajRef = doc(
          db,
          'Utilisateurs',
          idUserConnected,
          'Series',
          nameSeries,
          'Saisons',
          `Saison ${numSeason[0]}`,
          'Episodes',
          `Episode ${numEpisode[0]}`
        )
        updateDoc(EpisodeMajRef, { estRegarde: true })
        const SerieMajRef = doc(
          db,
          'Utilisateurs',
          idUserConnected,
          'Series',
          nameSeries
        )
        const compteur = series[0].nombreEpisodeRegarde
        const compteurSeason = seasons[0].nombreEpisodeRegarde

        updateDoc(SerieMajRef, { nombreEpisodeRegarde: compteur + 1 })
        updateDoc(SaisonMajRef, { nombreEpisodeRegarde: compteurSeason + 1 })
      }
    }
    if (estTermine === false) {
      setChecked(false)
    }
  }, [checked, numEpisode, seasons, idUserConnected, numSeason, series]) // eslint-disable-line react-hooks/exhaustive-deps

  // Critere d'arret pour le suivi de la série (si l'utilisateur a regardé tous les épisodes dispo)
  // Compter les episodes disponibles à regarder

  const estFinie = series[0].nombreEpisodeRegarde === series[0].nombreEpisode

  if (
    estFinie === true &&
    series[0].nombreEpisodeRegarde !== undefined &&
    series[0].nombreEpisode !== undefined
  ) {
    const SerieMajRef = doc(
      db,
      'Utilisateurs',
      idUserConnected,
      'Series',
      nameSeries
    )
    //console.log('je rentre dans la boucle')
    updateDoc(SerieMajRef, { estTermine: true })
  }

  // Bloc de code pour mettre un timer qui affichera le composant EpisodeTooSeeCard
  // tous les 1 secondes

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1)
    }, 1000)
    return () => clearInterval(interval)
  })
  let loadComponent = false
  if (seconds > 1) {
    loadComponent = true
  }

  console.log(episodes)

  return (
    <>
      {!loadComponent && (
        <div>
          <img src={LoaderEpisode} alt="loader" />
        </div>
      )}
      {loadComponent && episodes.length !== 0 && (
        <CardDiv>
          <div>
            <PictureStyle src={pictureSeries} />
          </div>
          <InfoContainer>
            <FirstInfoContainer>
              <SeriesTitle>{nameSeries}</SeriesTitle>
            </FirstInfoContainer>
            <SecondContainer>
              <InfoText>
                Saison {numSeason[0]} - Episode {numEpisode[0]}
              </InfoText>
            </SecondContainer>
          </InfoContainer>
          <ResumeWrapper>
            <ResumeStyle>{episodes[0]?.resumeEpisode}</ResumeStyle>
          </ResumeWrapper>
          <ThirdContainer>
            <ClickedStyle>
              <ClickedSpan>Cochez ici si vous avez vu l'épisode</ClickedSpan>
            </ClickedStyle>
            <CheckboxContainer>
              {!estFinie && (
                <input
                  onClick={handleClick}
                  checked={checked}
                  type="checkbox"
                  value="estRegarde"
                  readOnly
                />
              )}
            </CheckboxContainer>
          </ThirdContainer>
        </CardDiv>
      )}
    </>
  )
}
