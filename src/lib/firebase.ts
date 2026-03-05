'use client';
/**
 * @fileOverview Client-side Firebase initialization.
 */
import { initializeFirebase } from '@/firebase';

const { firestore } = initializeFirebase();

export const db = firestore;
