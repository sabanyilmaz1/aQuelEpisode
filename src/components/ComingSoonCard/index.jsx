import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CountStyle,
  DateContainer,
  DateStyle,
  EpisodeWrap,
  FirstInfo,
  FirstInfoContainer,
  InfoContainer,
  PhotoContainer,
  PictureStyle,
  SecondContainer,
  SecondInfo,
  TitleBtn,
} from './style'

export default function ComingSoonCard({
  nomSerie,
  numSaison,
  numEpisode,
  dateEpisode,
  imageSerie,
}) {

  // On utilise UseNavigate pour envoyer des données vers une autre page
  // pour permettre aux Utilisateurs en cliquant sur le nom d'une série de se rediriger 
  // vers la page Details de la série
  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false) // eslint-disable-line

  //Conversion de la date en format lettre 
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

  //On recupere la date du jour pour effectuer un compteur
  const dateNow = new Date()
  const count = parseInt(
    (dateEp.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24) + 1
  )

  //Variable pour pouvoir supprimer l'episode de l'affichage si le compteur est inférieur ou égale à 0
  let DeleteEpisode = false
  if (count <= 0) {
    DeleteEpisode = true
  }
  //Cette fonction permettra la redirection vers la page mesSéries/details
  const clickedAndRedirect = () => {
    setClicked(true)
    //On envoie des données vers la page mesSéries/details
    navigate('/private/myseries/details', { state: { data: nomSerie } })
  }

  return (
    <div>
      {!DeleteEpisode && (
        <EpisodeWrap>
          <PhotoContainer>
            <PictureStyle src={imageSerie} />
          </PhotoContainer>
          <InfoContainer>
            <FirstInfoContainer>
              <TitleBtn onClick={() => clickedAndRedirect()}>
                <FirstInfo>{nomSerie}</FirstInfo>
              </TitleBtn>
            </FirstInfoContainer>

            <SecondContainer>
              <SecondInfo>
                Saison {numSaison} - Episode {numEpisode}
              </SecondInfo>
            </SecondContainer>
          </InfoContainer>
          <DateContainer>
            <CountStyle>{count} J</CountStyle>
            <DateStyle>{dateEpStr}</DateStyle>
          </DateContainer>
        </EpisodeWrap>
      )}
    </div>
  )
}
