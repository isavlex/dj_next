import firebase from 'firebase/app'
import 'firebase/database'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAq2rBuSAzIX6WyZRrAcfZ4eGLPBapcaL8',
  authDomain: 'djkaraoke-c9ef0.firebaseapp.com',
  databaseURL: process.env.firebase_uri,
  projectId: 'djkaraoke-c9ef0',
  storageBucket: 'djkaraoke-c9ef0.appspot.com',
  messagingSenderId: '427028345093',
  appId: '1:427028345093:web:2f2f3eb249630a2e3a876c',
  measurementId: 'G-J8H2QCNL2W',
}

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
  }
  const db = firebase.database()
  return db
}
