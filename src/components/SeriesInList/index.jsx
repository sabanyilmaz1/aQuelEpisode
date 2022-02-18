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

export default function SerieInList() {
  /*{
    
  nomSerie,
  nombreSaisons,
  estTerminé,
  chaineSerie,
  imageSerie,
  nombreEpisode,
  nombreEpisodeRegarde
}*/
  return (
    <div>
      <SerieContainer>
        <SerieElement>
          <ImageSerie src={imGOT} />
          <InfoSerieContainer>
            <SerieTitle>Game of Thrones</SerieTitle>
            <SerieInfo>8 saisons - Terminée - HBO</SerieInfo>
          </InfoSerieContainer>
          <ProgressionContainer>
            <div>
              <ProgressionSpan>Progression</ProgressionSpan>
            </div>
            <ProgressionBar value="64" max="80" />
          </ProgressionContainer>
        </SerieElement>
      </SerieContainer>
    </div>
  )
}
