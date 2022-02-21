import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  setDoc,
} from 'firebase/firestore'

import { db } from '../../firebase-config'

export async function usersAlreadyAdd() {
  const UtilisateurCollectionRef = collection(db, 'Utilisateurs')
  const querySnapshot = await getDocs(UtilisateurCollectionRef)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    console.log(doc.id, ' => ', doc.data())
  })
}

export function addUsers(id, email) {
  //const UtilisateurCollectionRef = collection(db, 'Utilisateurs', id)
  return setDoc(doc(db, 'Utilisateurs', id), { id: id, email: email })
}

export async function addSeries(idUser, newSerie) {
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

export function getAllSerieByUser(user) {
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
  const idSaison = 'Saison' + newSeason.numSaison
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
