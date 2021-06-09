const admin = require('firebase-admin')
const serviceAccount = require('./secret.json')

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL:
        'https://djkaraoke-c9ef0-default-rtdb.europe-west1.firebasedatabase.app',
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error
    })
}
