import React from 'react'

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
          <PictureSeries src={pictureSeries} />
          <InfoSerieContainer>
            <SeriesTitle>{nameSeries}</SeriesTitle>
            <SeriesInfo>
              {numberSeasons} saisons - {channelSeries}{' '}
            </SeriesInfo>
          </InfoSerieContainer>
          <ProgressionContainer>
            <div>
              <ProgressionText>Progression</ProgressionText>
            </div>
            <ProgressionBar
              value={numberWatchedEpisodes}
              max={numberEpisodes}
            />
          </ProgressionContainer>
        </SeriesItems>
      </SeriesContainer>
    </div>
  )
}
