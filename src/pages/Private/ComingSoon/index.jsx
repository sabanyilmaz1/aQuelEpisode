import React, { useContext, useEffect, useState } from 'react'

import { AllEpisodes, NoEpisodeStyle, PageContainer, TitlePage } from './style'

import { db } from '../../../firebase-config'
import { UserContext } from '../../../utils/Usercontext'

import { onSnapshot, collection } from 'firebase/firestore'
import ComingSoonCard from '../../../components/ComingSoonCard'

export default function ComingSoon() {
  const { currentUser } = useContext(UserContext) //Recupere les informations sur l'utilisateur connecté
  const idUserConnected = currentUser.uid
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    // Recupere la liste de tous les épisodes qui ne sont pas encore sorties de tous les séries de l'utilisateur 
    const unsubscribe = onSnapshot(
      collection(db, 'Utilisateurs', idUserConnected, 'Series'),
      (serie) => {
        const serieN = serie.docs.map((doc) => doc.data()) // liste avec les séries
        for (let i = 0; i < serieN.length; i++) {
          onSnapshot(
            collection(
              db,
              'Utilisateurs',
              idUserConnected,
              'Series',
              serieN[i].nomSerie,
              'Saisons'
            ),
            (saison) => {
              const saisonN = saison.docs.map((doc) => doc.data()) // liste avec les saisons
              for (let j = 0; j < saisonN.length; j++) {
                const saisonId = 'Saison ' + saisonN[j].numSaison
                onSnapshot(
                  collection(
                    db,
                    'Utilisateurs',
                    idUserConnected,
                    'Series',
                    serieN[i].nomSerie,
                    'Saisons',
                    saisonId,
                    'Episodes'
                  ),
                  (episode) => {
                    const episodeToAdd = episode.docs.map((doc) => doc.data()) // listes avec les episodes
                    for (let z = 0; z < episodeToAdd.length; z++) {
                      // on ajoute seulement les episodes qui ne sont pas encore sortie dans le state episodes
                      if (episodeToAdd[z].estSorti === false) {
                        setEpisodes((oldArray) => [
                          ...oldArray,
                          episodeToAdd[z],
                        ])
                      }
                    }
                  }
                )
              }
            }
          )
        }
      }
    )
    return unsubscribe
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Trier les épisodes par dates pour l'affichage avec une fonction
  // qui compare les dates
  episodes.sort(function (a, b) {
    var key1 = new Date(a.dateEpisode)
    var key2 = new Date(b.dateEpisode)

    if (key1 < key2) {
      return -1
    } else if (key1 === key2) {
      return 0
    } else {
      return 1
    }
  })

  return (
    <PageContainer numberEpisodes={episodes.length}>
      <TitlePage>À Venir</TitlePage>
      {episodes.length === 0 && (
        <div>
          <NoEpisodeStyle>Pas d'épisode à venir ! </NoEpisodeStyle>
        </div>
      )}
      <AllEpisodes>
        {episodes.map((episode) => (
          <ComingSoonCard
            key={`${episode.nomSerie}`}
            nomSerie={episode.nomSerie}
            numEpisode={episode.numEpisode}
            numSaison={episode.numSaison}
            dateEpisode={episode.dateEpisode}
            imageSerie={episode.imageSerie}
          />
        ))}
      </AllEpisodes>
    </PageContainer>
  )
}
