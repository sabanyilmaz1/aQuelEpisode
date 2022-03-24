import React, { useState } from 'react'
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

  return (
    <SeriesContainer>
      <DeleteDiv>
        <DeleteBtn>
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
