import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../utils/Usercontext'

// Fonction Firebase
import { getAllSeriesByUser } from '../../../database/FunctionsDatabase'

//Components
import MySeriesCard from '../../../components/MySeriesCard'

//Style
import { PageDiv, SeriesDiv, TitlePage } from './style'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../../firebase-config'

export default function MySeries() {
  const { currentUser } = useContext(UserContext) //Recupere les informations sur l'utilisateur connecté
  const idUserConnected = currentUser.uid
  const [series, setSeries] = useState([])

  useEffect(() => {
    // Recupere la liste des séries de l'utilisateur

    const unsubscribe = onSnapshot(
      collection(db, 'Utilisateurs', idUserConnected, 'Series'),
      (serie) => {
        setSeries(serie.docs.map((doc) => doc.data()))
      }
    )
    return unsubscribe
  }, [])

  //console.log(series)
  return (
    <PageDiv>
      <TitlePage>Mes Séries</TitlePage>
      <SeriesDiv>
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
      </SeriesDiv>
    </PageDiv>
  )
}
