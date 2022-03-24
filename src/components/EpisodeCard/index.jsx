import React from 'react'
import {
  EpisodeWrap,
  FirstInfo,
  FirstInfoContainer,
  InfoDiv,
  PictureStyle,
  SecondInfo,
} from './style'

export default function EpisodeCard({
  numEpisode,
  nomEpisode,
  resumeEpisode,
  photoEpisode,
}) {
  return (
    <EpisodeWrap>
      <PictureStyle src={photoEpisode} alt="ImageEpisode" />
      <InfoDiv>
        <FirstInfo>
          Episode {numEpisode} - {nomEpisode}
        </FirstInfo>
        <FirstInfoContainer>
          <SecondInfo>{resumeEpisode}</SecondInfo>
        </FirstInfoContainer>
      </InfoDiv>
    </EpisodeWrap>
  )
}
