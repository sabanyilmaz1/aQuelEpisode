import React from 'react'
import ProgressBar from '../ProgressBar'

//Style
import {
  SeriesContainer,
  PictureSeries,
  InfoSerieContainer,
  SeriesTitle,
  SeriesItems,
  SeriesInfo,
  ProgressionText,
  ProgressionContainer,
  ProgressionBar,
  DeleteText,
  DeleteBtn,
} from './style'

export default function MySeries({
  nameSeries,
  numberSeasons,
  channelSeries,
  pictureSeries,
  numberEpisodes,
  numberWatchedEpisodes,
}) {
  return (
    <div>
      <SeriesContainer>
        <SeriesItems>
          <DeleteBtn>
            <DeleteText>Supprimer la série </DeleteText>{' '}
          </DeleteBtn>
          <PictureSeries src={pictureSeries} />
          <InfoSerieContainer>
            <SeriesTitle>{nameSeries}</SeriesTitle>
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
