'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

/**
 * Initializes Firebase App and returns core SDK instances.
 * Prioritizes the explicit configuration object to ensure consistency across environments.
 */
export function initializeFirebase() {
  let firebaseApp: FirebaseApp;

  if (getApps().length > 0) {
    firebaseApp = getApp();
  } else {
    // Standard initialization with explicit config is most reliable in preview environments
    firebaseApp = initializeApp(firebaseConfig);
  }

  return getSdks(firebaseApp);
}

/**
 * Returns the core Firebase SDKs for a given app instance.
 */
export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
