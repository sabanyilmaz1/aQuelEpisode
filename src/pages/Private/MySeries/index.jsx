import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../utils/Usercontext'

// Fonction Firebase
import { getAllSeriesByUser } from '../../../database/FunctionsDatabase'

//Components
import MySeriesCard from '../../../components/MySeriesCard'

//Style
import { TitlePage } from './style'

export default function MySeries() {
  const { currentUser } = useContext(UserContext) //Recupere les informations sur l'utilisateur connecté
  const idUserConnected = currentUser.uid
  const [series, setSeries] = useState([])

  useEffect(() => {
    getSeries()
  })

  // Recupere la liste des séries de l'utilisateur
  const getSeries = async () => {
    const data = await getAllSeriesByUser(idUserConnected)
    setSeries(data.docs.map((doc) => ({ ...doc.data() })))
  }

  return (
    <div>
      <TitlePage>Mes Séries</TitlePage>
      <div>
        {series.map((serie, index) => (
          <MySeriesCard
            key={`${serie.nomSerie}-${index}`}
            pictureSeries={serie.imageSerie}
            nameSeries={serie.nomSerie}
            numberSeasons={serie.nombreSaisons}
            channelSeries={serie.nomChaine}
            numberEpisodes={serie.nombreEpisode}
            numberWatchedEpisodes={serie.nombreEpisodeRegarde}
          />
        ))}
      </div>
    </div>
  )
}
