import React, { useState, useEffect } from 'react'

import AddSeriesCard from '../../../components/AddSeriesCard'
import { Container, GlobalDiv, PageContainer, RechercheInput } from './style'

export default function AddSeries() {
  
  //requete API TMDB pour recuperer la premiere page des séries populaires de la base de donnée de l'api
  const TMDB_API =
    'https://api.themoviedb.org/3/tv/popular?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR&page=1'

  //requete API TMDB pour effectuer une recherche de série
  const TMDB_SEARCH =
    'https://api.themoviedb.org/3/search/tv?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR&page=1&include_adult=false&query='

  //state pour stocker les séries recuperer avec l'api
  const [series, setSeries] = useState([])
  
  //State pour gerer le terme de recherche pour la requete avec TMDB_SEARCH
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getShows(TMDB_API)
  }, [])

  //une fonction pour recuperer les séries à partir de la requete api
  const getShows = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setSeries(data.results)
      })
  }

  // une fonction qui gere le form
  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      getShows(TMDB_SEARCH + searchTerm)
      //remettre le terme de recherche "à zero"
      setSearchTerm('')
    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <GlobalDiv numberSeries={series.length}>
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
    </GlobalDiv>
  )
}
