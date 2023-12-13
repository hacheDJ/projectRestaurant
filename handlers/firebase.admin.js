const { initializeApp } = require('firebase-admin/app')
const { getStorage } = require('firebase-admin/storage')

const serviceAccount = require('./serviceAccountKey.json')

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'project-restaurant-df24c.appspot.com'
});

const bucket = getStorage().bucket()

module.exports = bucket