import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../utils/Usercontext'

//Components
import MySeriesCard from '../../../components/MySeriesCard'

//Style
import {
  NoSeriesStyle,
  PageDiv,
  SeriesDiv,
  TitlePage,
  StyledLink,
} from './style'
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    
    <PageDiv numberSeries={series.length}>
      <TitlePage>Mes Séries</TitlePage>
      {series.length === 0 && (
        <div>
          <NoSeriesStyle>
            Aucune série ajoutée, aller à la page{' '}
            <StyledLink to="/private/addseries">Ajouter une série</StyledLink>{' '}
            pour commencer à ajouter des séries
          </NoSeriesStyle>
        </div>
      )}
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
