import React, { Component } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

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
export const SeasonBtn = styled.button`
  background: transparent;
  border: none !important;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: rgba(255, 134, 0, 0.5);
  }
  &:active {
    transform: scale(1.03) translateX(-10%);
  }
`

export default function SeasonCard({
  numSeason,
  numEpisode,
  numMaxEpisode,
  idSerie,
}) {
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate()
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

  const clickedAndRedirect = () => {
    setClicked(true)
    console.log(clicked)
    navigate('season', { state: { numSeason: numSeason, idSerie: idSerie } })
  }

  return (
    <>
      {isFinish && (
        <SeasonWrap>
          <SeasonBtn onClick={() => clickedAndRedirect()}>
            <SeasonText>
              Saison {numSeason} - {numEpisode}/{numMaxEpisode}
            </SeasonText>
          </SeasonBtn>
        </SeasonWrap>
      )}
      {notFinish && (
        <SeasonWrapNotFinish>
          <SeasonBtn onClick={() => clickedAndRedirect()}>
            <SeasonText>
              Saison {numSeason} - {numEpisode}/{numMaxEpisode}
            </SeasonText>
          </SeasonBtn>
        </SeasonWrapNotFinish>
      )}
      {notStarted && (
        <SeasonWrapNotStarted>
          <SeasonBtn onClick={() => clickedAndRedirect()}>
            <SeasonText>
              Saison {numSeason} - {numEpisode}/{numMaxEpisode}
            </SeasonText>
          </SeasonBtn>
        </SeasonWrapNotStarted>
      )}
    </>
  )
}
