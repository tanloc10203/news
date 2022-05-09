import { getFirestore, serverTimestamp } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const config = {
  firebaseConfig: {
    apiKey: 'AIzaSyBJrCt3OHXUkWreBl6Rg6H6fKLuk6T--D4',
    authDomain: 'news-firebase-9bbd7.firebaseapp.com',
    projectId: 'news-firebase-9bbd7',
    storageBucket: 'news-firebase-9bbd7.appspot.com',
    messagingSenderId: '644342917244',
    appId: '1:644342917244:web:b4007b4871396eea0a01f9',
    measurementId: 'G-BCV8N1YPKM',
  },
};

const app = initializeApp(config.firebaseConfig);

export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);
export const createdAt = serverTimestamp();
