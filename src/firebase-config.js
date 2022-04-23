import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAItSfqUPRGrtmOPQFbIaIFgHA_MgvuZbY',
  authDomain: 'aquelepisode.firebaseapp.com',
  projectId: 'aquelepisode',
  storageBucket: 'aquelepisode.appspot.com',
  messagingSenderId: '220034235030',
  appId: '1:220034235030:web:44a9f2f75e934823b2a0b7',
  measurementId: 'G-1KJ98QM07N',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const db = getFirestore(app)
export { db }
