//Fonction de firebase pour manipuler les données
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  query,
  where,
} from 'firebase/firestore'

import { db } from '../../firebase-config'

export function addUsers(id, email) {
  return setDoc(doc(db, 'Utilisateurs', id), { id: id, email: email })
}

export function addSeries(idUser, newSerie) {
  const SerieCollectionRef = doc(
    db,
    'Utilisateurs',
    idUser,
    'Series',
    newSerie.nomSerie
  )
  return setDoc(SerieCollectionRef, newSerie)
  //return addDoc(SerieCollectionRef, newSerie)
}

export function getAllUsers() {
  const UtilisateurCollectionRef = collection(db, 'Utilisateurs')
  return getDocs(UtilisateurCollectionRef)
}

export function getAllSeriesByUser(user) {
  const SeriesCollectionRef = collection(db, 'Utilisateurs', user, 'Series')
  return getDocs(SeriesCollectionRef)
}

export function setEpisodeWatched(idUser, idSerie, idSaison, idEpisode) {
  const EpisodesRef = doc(
    db,
    'Utilisateurs',
    idUser,
    'Series',
    idSerie,
    'Saisons',
    idSaison,
    'Episodes',
    idEpisode
  )
  return updateDoc(EpisodesRef, { estRegarde: true })
}

export function addSeasons(idUser, idSerie, newSeason) {
  const idSaison = 'Saison ' + newSeason.numSaison
  const SaisonRef = doc(
    db,
    'Utilisateurs',
    idUser,
    'Series',
    idSerie,
    'Saisons',
    idSaison
  )
  return setDoc(SaisonRef, newSeason)
}

export function addEpisodes(idUser, idSerie, season, newEpisode) {
  const idEpisode = 'Episode ' + newEpisode.numEpisode
  const idSaison = 'Saison ' + season.numSaison
  const EpisodeRef = doc(
    db,
    'Utilisateurs',
    idUser,
    'Series',
    idSerie,
    'Saisons',
    idSaison,
    'Episodes',
    idEpisode
  )
  return setDoc(EpisodeRef, newEpisode)
}

export function getFirstEpisodeToWatch(idUser, idSerie, idSeason) {
  //Recherche de la saison du prochaine épisode à voir
  const q = query(collection(db, 'Utilisateurs'))
}
