import React from 'react'

//Style
import { SerieContainer } from './style'
import { ImageSerie } from './style'
import { InfoSerieContainer } from './style'
import { SerieTitle } from './style'
import { SerieElement } from './style'
import { SerieInfo } from './style'
import { ProgressionSpan } from './style'
import { ProgressionContainer } from './style'
import { ProgressionBar } from './style'

import imGOT from '../../assets/imagegot.png'

export default function SerieInList({
  nomSerie,
  nombreSaisons,
  chaineSerie,
  imageSerie,
  nombreEpisode,
  nombreEpisodeRegarde,
}) {
  return (
    <div>
      <SerieContainer>
        <SerieElement>
          <ImageSerie src={imageSerie} />
          <InfoSerieContainer>
            <SerieTitle>{nomSerie}</SerieTitle>
            <SerieInfo>
              {nombreSaisons} saisons - {chaineSerie}{' '}
            </SerieInfo>
          </InfoSerieContainer>
          <ProgressionContainer>
            <div>
              <ProgressionSpan>Progression</ProgressionSpan>
            </div>
            <ProgressionBar value={nombreEpisodeRegarde} max={nombreEpisode} />
          </ProgressionContainer>
        </SerieElement>
      </SerieContainer>
    </div>
  )
}
