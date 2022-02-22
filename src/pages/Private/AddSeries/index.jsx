import React, { useState, useEffect } from 'react'

import AddSeriesCard from '../../../components/AddSeriesCard'
import { Container, PageContainer, RechercheInput } from './style'

export default function AddSeries() {
  const TMDB_API =
    'https://api.themoviedb.org/3/tv/popular?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR&page=1'

  const TMDB_SEARCH =
    'https://api.themoviedb.org/3/search/tv?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR&page=1&include_adult=false&query='

  const [series, setSeries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getShows(TMDB_API)
  }, [])

  const getShows = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSeries(data.results)
      })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (searchTerm) {
      getShows(TMDB_SEARCH + searchTerm)
      setSearchTerm('')
    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <Container>
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="RechercheSerie"></label>
          <RechercheInput
            id="RechercheSerie"
            name="RechercheSerie"
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </Container>

      <PageContainer>
        {series.length > 0 &&
          series.map((show) => (
            <AddSeriesCard
              key={show.id}
              nameSerie={show.name}
              posterLink={show.poster_path}
              idSerie={show.id}
            />
          ))}
      </PageContainer>
    </div>
  )
}
