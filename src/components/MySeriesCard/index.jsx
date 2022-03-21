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
    <div>
      <SeriesContainer>
        <SeriesItems>
          <DeleteBtn>
            <DeleteText>Supprimer la série </DeleteText>{' '}
          </DeleteBtn>
          <PictureSeries src={pictureSeries} />
          <InfoSerieContainer>
            <SeriesTitleContainer>
              <TitleBtn onClick={() => clickedAndRedirect()}>
                <SeriesTitle>{nameSeries}</SeriesTitle>
              </TitleBtn>
            </SeriesTitleContainer>

            <SeriesInfoContainer>
              <SeriesInfo>
                {numberSeasons} saisons - {channelSeries}{' '}
              </SeriesInfo>
            </SeriesInfoContainer>
            <ProgressionContainer>
              <ProgressBar
                maxValue={numberEpisodes}
                value={numberWatchedEpisodes}
              />
            </ProgressionContainer>
          </InfoSerieContainer>
        </SeriesItems>
      </SeriesContainer>
    </div>
  )
}
