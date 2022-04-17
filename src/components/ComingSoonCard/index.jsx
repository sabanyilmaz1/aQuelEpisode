import React, { useState, useEffect } from 'react'
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
  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false)

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

  const dateNow = new Date()
  const count = parseInt(
    (dateEp.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24) + 1
  )

  let DeleteEpisode = false
  if (count <= 0) {
    DeleteEpisode = true
  }

  const clickedAndRedirect = () => {
    setClicked(true)
    console.log(clicked)
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
