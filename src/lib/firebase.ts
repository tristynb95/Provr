<<<<<<< HEAD
'use client';
/**
 * @fileOverview Client-side Firebase initialization.
 * Replaces the incorrect server-side firebase-admin import that was causing build errors.
 */
import { initializeFirebase } from '@/firebase';

const { firestore } = initializeFirebase();

export const db = firestore;
=======
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
>>>>>>> e98354011ba006e20c3bfd6b85351b940e0741a1
