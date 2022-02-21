import React, { useState, useEffect } from 'react'

import SerieInAddList from '../../../components/SerieInAddList'
import { Container, PageContainer, RechercheInput } from './style'

export default function AddTvShows() {
  const TMDB_API =
    'https://api.themoviedb.org/3/tv/popular?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR&page=1'

  const TMDB_RECHERCHE =
    'https://api.themoviedb.org/3/search/tv?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR&page=1&include_adult=false&query='

  const [shows, setShows] = useState([])
  const [TexteRecherche, setTexteRecherche] = useState('')

  useEffect(() => {
    getShows(TMDB_API)
  }, [])

  const getShows = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setShows(data.results)
      })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (TexteRecherche) {
      getShows(TMDB_RECHERCHE + TexteRecherche)
      setTexteRecherche('')
    }
  }

  const handleOnChange = (e) => {
    setTexteRecherche(e.target.value)
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
            value={TexteRecherche}
            onChange={handleOnChange}
          />
        </form>
      </Container>

      <PageContainer>
        {shows.length > 0 &&
          shows.map((show) => (
            <SerieInAddList
              key={show.id}
              nomSerie={show.name}
              lienPoster={show.poster_path}
              idSerie={show.id}
            />
          ))}
      </PageContainer>
    </div>
  )
}
