import React, { useEffect } from 'react'
import { useContext } from 'react'

import {
  CardContainer,
  CloseBtn,
  CloseDiv,
  Element,
  OverviewSeries,
  PictureSeries,
  TitleSerie,
} from './style'

import { UserContext } from '../../utils/Usercontext'
import close from '../../assets/close.svg'
import axios from 'axios'
import { useState } from 'react/cjs/react.development'

export default function AddSeriesDetailCard() {
  //genreSeries est un tableau contenant les genres de la série
  const { toogleDetails, idSeriesDetails } = useContext(UserContext)

  const [series, setSeries] = useState([])

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const reponse = await axios.get(
      `https://api.themoviedb.org/3/tv/${idSeriesDetails}?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR`
    )
    setSeries(reponse.data)
  }

  //console.log(series)
  const pictureSeries = 'http://image.tmdb.org/t/p/w500/' + series?.poster_path
  const nameSeries = series.name
  const overviewSeries = series.overview

  //console.log('genre', genreSeries)

  return (
    <div>
      <CardContainer>
        <CloseDiv>
          <div>
            <CloseBtn onClick={() => toogleDetails('fermeDetails')}>
              <img src={close} alt="btnClose" />
            </CloseBtn>
          </div>
        </CloseDiv>
        <div>
          <Element>
            <PictureSeries src={pictureSeries} alt="picture" />
            <TitleSerie>{nameSeries}</TitleSerie>
            <OverviewSeries>{overviewSeries}</OverviewSeries>
          </Element>
        </div>
      </CardContainer>
    </div>
  )
}
