import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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
  TitleBtn,
} from './style'

import './style.css'

import LoaderEpisode from '../../assets/loaderEpisode.gif'

export default function EpisodeToSeeCard({ nameSeries, pictureSeries }) {

  //Permet la redirection vers une autre page en envoyant des données
  const navigate = useNavigate()

  //Recupere les informations sur l'utilisateur connecté
  const { currentUser } = useContext(UserContext)
  const idUserConnected = currentUser.uid

  //Plusioeurs state pour stocker plusieurs données sur une série 
  const [series, setSeries] = useState([{}])
  const [seasons, setSeasons] = useState([{}])
  const [episodes, setEpisodes] = useState([{}])
  const [numSeason, setNumSeason] = useState([])
  const [numEpisode, setNumEpisode] = useState([])

  //State pour connaitre l'etat true ou false si l'utilisateur clique sur le 
  //nom de la série pour se rediriger vers la page detail de la sériee
  const [clicked, setClicked] = useState(false) //eslint-disable-line

  //State pour le checkbox
  const [checked, setChecked] = useState(false)

  // State pour le timer
  const [seconds, setSeconds] = useState(0)

  //remise à zero du timer et du checkbox apres chaque cochage
  const handleClick = () => {
    setChecked(!checked)
    setSeconds(0)
  }

  //Recupere des infos de la série avec le nameSeries en appelant la base de données
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

  //Recupere les saisons de la série
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

//Recupere les épisodes de la premiere saison non terminée par l'utilisateur et ainsi 
//pouvoir prendre le premier épisode non regardé pour l'afficher dans la page
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
        //Recupere le nombre d'épisode regardé de la série et de la saison
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
        updateDoc(EpisodeMajRef, {
          estRegarde: true,
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

  // Une boucle pour mettre en place en timer pour afficher chaque episode avec un petit temps d'attente
  // pour le feedback de l'utilisateur, il sait qu'il a coché un épisode avec ce petit temps
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
  //Une fonction qui permet la redirection vers la page details de la série
  const clickedAndRedirect = () => {
    setClicked(true)
    navigate('/private/myseries/details', { state: { data: nameSeries } })
  }

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
              <TitleBtn onClick={() => clickedAndRedirect()}>
                <SeriesTitle>{nameSeries}</SeriesTitle>
              </TitleBtn>
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
              <input
                onClick={handleClick}
                checked={checked}
                type="checkbox"
                value="estRegarde"
                readOnly
              />
            </CheckboxContainer>
          </ThirdContainer>
        </CardDiv>
      )}
    </>
  )
}
