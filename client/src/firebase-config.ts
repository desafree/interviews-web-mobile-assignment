import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDgeA8FoC2a90tzvtf_rH3F8ZB46vk27_c',
  authDomain: 'xtream-challenge-8e28f.firebaseapp.com',
  projectId: 'xtream-challenge-8e28f',
  storageBucket: 'xtream-challenge-8e28f.appspot.com',
  messagingSenderId: '692776871284',
  appId: '1:692776871284:web:e74bf3780bc02a8badf821',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
