'use client';
/**
 * @fileOverview Client-side Firebase initialization.
 * Replaces the incorrect server-side firebase-admin import that was causing build errors.
 */
import { initializeFirebase } from '@/firebase';

const { firestore } = initializeFirebase();

export const db = firestore;
