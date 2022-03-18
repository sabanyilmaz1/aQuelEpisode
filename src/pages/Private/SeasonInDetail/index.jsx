import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { TitleDiv, TitleText } from '../MySeriesInDetail/style'

export default function SeasonInDetail() {
  const { state } = useLocation()
  console.log(state)
  return (
    <div>
      <TitleDiv>
        <TitleText>
          Mes Séries - {state.idSerie} - Saison {state.numSeason}{' '}
        </TitleText>
      </TitleDiv>
    </div>
  )
}
