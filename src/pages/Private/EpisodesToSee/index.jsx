import React, { useState, useEffect, useContext } from 'react'

import { onSnapshot, collection, query } from 'firebase/firestore'
import { where } from 'firebase/firestore'
import { db } from '../../../firebase-config'
import { UserContext } from '../../../utils/Usercontext'

import EpisodeToSeeCard from '../../../components/EpisodeToSeeCard'
import styled from 'styled-components'

export const TitlePage = styled.h1`
  width: 424px;
  height: 118px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 45px;
  line-height: 88px;
  letter-spacing: -0.05em;
  color: #27187e;
  margin-left: 50px;
  margin-top: 20px;
`

export default function EpisodesToSee() {
  const { currentUser } = useContext(UserContext) //Recupere les informations sur l'utilisateur connecté
  const idUserConnected = currentUser.uid
  const [series, setSeries] = useState([])

  useEffect(() => {
    // Recupere la liste des séries de l'utilisateur non terminés
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'Utilisateurs', idUserConnected, 'Series'),
        where('estTermine', '==', false)
      ),
      (serie) => {
        setSeries(serie.docs.map((doc) => doc.data()))
      }
    )
    return unsubscribe
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  console.log('series', series)
  return (
    <div>
      <TitlePage>À Voir</TitlePage>
      <div>
        {series.map((serie, index) => (
          <EpisodeToSeeCard
            key={`${serie.nomSerie}-${index}`}
            pictureSeries={serie.imageSerie}
            nameSeries={serie.nomSerie}
          />
        ))}
      </div>
    </div>
  )
}
