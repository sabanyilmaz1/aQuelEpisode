import React, { useContext, useEffect, useState } from 'react'

import { AllEpisodes, TitlePage } from './style'

import { db } from '../../../firebase-config'
import { UserContext } from '../../../utils/Usercontext'

import { onSnapshot, collection } from 'firebase/firestore'
import ComingSoonCard from '../../../components/ComingSoonCard'

export default function ComingSoon() {
  const { currentUser } = useContext(UserContext) //Recupere les informations sur l'utilisateur connecté
  const idUserConnected = currentUser.uid
  //const [series, setSeries] = useState([])
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    // Recupere la liste des séries de l'utilisateur

    const unsubscribe = onSnapshot(
      collection(db, 'Utilisateurs', idUserConnected, 'Series'),
      (serie) => {
        //setSeries(serie.docs.map((doc) => doc.data()))
        const serieN = serie.docs.map((doc) => doc.data()) // liste avec les séries
        //console.log('serieN', serieN)
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
              const saisonN = saison.docs.map((doc) => doc.data())
              console.log('saisonN', saisonN)
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
                    const episodeToAdd = episode.docs.map((doc) => doc.data())
                    //setEpisodes((oldArray) => [...oldArray, episodeToAdd])
                    for (let z = 0; z < episodeToAdd.length; z++) {
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

  //console.log(series)
  console.log('episodes', episodes)

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

  console.log('apres maj', episodes)

  return (
    <div>
      <TitlePage>À Venir</TitlePage>
      <div>
        <AllEpisodes>
          {episodes.map((episode, index) => (
            <ComingSoonCard
              nomSerie={episode.nomSerie}
              numEpisode={episode.numEpisode}
              numSaison={episode.numSaison}
              dateEpisode={episode.dateEpisode}
              imageSerie={episode.imageSerie}
            />
          ))}
        </AllEpisodes>
      </div>
    </div>
  )
}
