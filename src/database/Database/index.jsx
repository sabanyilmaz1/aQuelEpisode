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

export function addUsers(id) {
  //const UtilisateurCollectionRef = collection(db, 'Utilisateurs', id)
  return setDoc(doc(db, 'Utilisateurs', id), { id: id })
}

export function addSeries(idUser, newSerie) {
  const SerieCollectionRef = collection(db, 'Utilisateurs', idUser, 'Series')
  return addDoc(SerieCollectionRef, newSerie)
}

export function getAllUsers() {
  const UtilisateurCollectionRef = collection(db, 'Utilisateurs')
  return getDocs(UtilisateurCollectionRef)
}

export function getAllSerieByUser(user) {
  const SeriesCollectionRef = collection(db, 'Utilisateurs', user, 'Series')
  return getDocs(SeriesCollectionRef)
}
