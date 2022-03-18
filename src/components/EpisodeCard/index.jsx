import React from 'react'
import {
  EpisodeWrap,
  FirstInfo,
  InfoDiv,
  PictureDiv,
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
          Episode {numEpisode} - " {nomEpisode} "
        </FirstInfo>
        <SecondInfo>{resumeEpisode}</SecondInfo>
      </InfoDiv>
    </EpisodeWrap>
  )
}
