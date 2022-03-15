import React, { Component } from 'react'
import styled from 'styled-components'

const SeasonWrap = styled.div`
  width: 25%;
  height: 10%;
  background: #ff8600;
  border-radius: 25px;
  text-align: center;
  margin-top: 30px;
  margin-left: 80px;
`

const SeasonWrapNotFinish = styled.div`
  width: 25%;
  height: 10%;
  background: #f1c089;
  border-radius: 25px;
  text-align: center;
  margin-top: 30px;
  margin-left: 80px;
`
const SeasonWrapNotStarted = styled.div`
  width: 25%;
  height: 10%;
  background: #f1f2f6;
  border-radius: 25px;
  text-align: center;
  margin-top: 30px;
  margin-left: 80px;
`

const SeasonText = styled.span`
  font-family: 'Bebas Neue';
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
  color: #000000;
`

export default function SeasonCard({ numSeason, numEpisode, numMaxEpisode }) {
  const quotient = numEpisode / numMaxEpisode
  let isFinish = false
  let notStarted = false
  let notFinish = false
  if (quotient === 1) {
    isFinish = true
  }
  if (quotient === 0) {
    notStarted = true
  }
  if (quotient < 1 && quotient > 0) {
    notFinish = true
  }
  console.log('quotient', quotient)

  return (
    <>
      {isFinish && (
        <SeasonWrap>
          <SeasonText>
            Saison {numSeason} - {numEpisode}/{numMaxEpisode}
          </SeasonText>
        </SeasonWrap>
      )}
      {notFinish && (
        <SeasonWrapNotFinish>
          <SeasonText>
            Saison {numSeason} - {numEpisode}/{numMaxEpisode}
          </SeasonText>
        </SeasonWrapNotFinish>
      )}
      {notStarted && (
        <SeasonWrapNotStarted>
          <SeasonText>
            Saison {numSeason} - {numEpisode}/{numMaxEpisode}
          </SeasonText>
        </SeasonWrapNotStarted>
      )}
    </>
  )
}
