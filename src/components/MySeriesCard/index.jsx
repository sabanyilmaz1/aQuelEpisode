import React, { useState, useContext } from 'react'
import ProgressBar from '../ProgressBar'

import { useNavigate } from 'react-router-dom'
//Style
import {
  SeriesContainer,
  PictureSeries,
  InfoSerieContainer,
  SeriesTitle,
  SeriesItems,
  SeriesInfo,
  ProgressionContainer,
  DeleteText,
  DeleteBtn,
  TitleBtn,
  SeriesInfoContainer,
  SeriesTitleContainer,
  ItemsCenter,
  DeleteDiv,
} from './style'

import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { UserContext } from '../../utils/Usercontext'

export default function MySeries({
  nameSeries,
  numberSeasons,
  channelSeries,
  pictureSeries,
  numberEpisodes,
  numberWatchedEpisodes,
}) {
  const navigate = useNavigate()

  const [clicked, setClicked] = useState(false)

  const clickedAndRedirect = () => {
    setClicked(true)
    console.log(clicked)
    navigate('details', { state: { data: nameSeries } })
  }
  const { currentUser } = useContext(UserContext) //Recupere les informations sur l'utilisateur connecté
  const idUserConnected = currentUser.uid
  const clickedAndDeleteSeries = async () => {
    await deleteDoc(
      doc(db, 'Utilisateurs', idUserConnected, 'Series', nameSeries)
    )
  }

  return (
    <SeriesContainer>
      <DeleteDiv>
        <DeleteBtn onClick={() => clickedAndDeleteSeries()}>
          <DeleteText>Supprimer la série </DeleteText>{' '}
        </DeleteBtn>
      </DeleteDiv>
      <ItemsCenter>
        <div>
          <PictureSeries src={pictureSeries} />
        </div>
        <SeriesTitleContainer>
          <TitleBtn onClick={() => clickedAndRedirect()}>
            <SeriesTitle>{nameSeries} > </SeriesTitle>
          </TitleBtn>
        </SeriesTitleContainer>
        <SeriesInfoContainer>
          <SeriesInfo>
            {numberSeasons} saisons - {channelSeries}{' '}
          </SeriesInfo>
        </SeriesInfoContainer>
      </ItemsCenter>

      <ProgressionContainer>
        <ProgressBar maxValue={numberEpisodes} value={numberWatchedEpisodes} />
      </ProgressionContainer>
    </SeriesContainer>
  )
}
