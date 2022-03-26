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

export default function EpisodeToSeeCard({ nameSeries, pictureSeries }) {
  const { currentUser } = useContext(UserContext) //Recupere les informations sur l'utilisateur connecté
  const idUserConnected = currentUser.uid
  const [series, setSeries] = useState([{}])
  const [seasons, setSeasons] = useState([{}])
  const [episodes, setEpisodes] = useState([{}]) // eslint-disable-line no-unused-vars
  const [numSeason, setNumSeason] = useState([])
  const [numEpisode, setNumEpisode] = useState([])

  //Checkbox
  const [checked, setChecked] = useState(false)

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
    // Recupere la liste des saisons de l'utilisateur non terminés pour la série donnée
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
    // Recupere la liste des séries de l'utilisateur non terminés
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

  //console.log('unchecked-numEp(0)', numEpisode[0])

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
        //console.log('compteur', compteur)
        updateDoc(SerieMajRef, { nombreEpisodeRegarde: compteur + 1 })
        updateDoc(SaisonMajRef, { nombreEpisodeRegarde: compteurSeason + 1 })
        //Saison Terminée
        // console.log('Saison terminée')
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
        //console.log('compteur', compteur)
        updateDoc(SerieMajRef, { nombreEpisodeRegarde: compteur + 1 })
        updateDoc(SaisonMajRef, { nombreEpisodeRegarde: compteurSeason + 1 })
      }
    }
    if (estTermine === false) {
      setChecked(false)
    }
  }, [checked, numEpisode, seasons, idUserConnected, numSeason, series]) // eslint-disable-line react-hooks/exhaustive-deps

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

  console.log(seconds)

  return (
    <>
      {loadComponent && (
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
