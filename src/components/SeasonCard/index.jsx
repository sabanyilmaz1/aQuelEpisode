import React, { Component } from 'react'
import styled from 'styled-components'

const SeasonWrap = styled.div`
  width: 350px;
  height: 54px;
  background: #ff8600;
  border-radius: 25px;
  //margin-right: 40px;
  margin-left: 50px;
  text-align: center;
  margin-top: 30px;
`

const SeasonText = styled.span`
  font-family: 'Bebas Neue';
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 43px;
  color: #000000;
`

export default function SeasonCard({ numSeason, numEpisode, numMaxEpisode }) {
  return (
    <div>
      <SeasonWrap>
        <SeasonText>
          Saison {numSeason} {numEpisode}/{numMaxEpisode}
        </SeasonText>
      </SeasonWrap>
    </div>
  )
}
