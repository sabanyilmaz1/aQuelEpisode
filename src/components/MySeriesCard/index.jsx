import React, { useContext, useState } from 'react'
import ProgressBar from '../ProgressBar'

import { Link, useNavigate } from 'react-router-dom'
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
} from './style'
import MySeriesInDetail from '../../pages/Private/MySeriesInDetail'

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
            <div>
              <TitleBtn onClick={() => clickedAndRedirect()}>
                <SeriesTitle>{nameSeries}</SeriesTitle>
              </TitleBtn>
            </div>
            <SeriesInfo>
              {numberSeasons} saisons - {channelSeries}{' '}
            </SeriesInfo>
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
