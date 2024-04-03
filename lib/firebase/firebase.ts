"use client";
// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import {
  Analytics,
  getAnalytics,
  isSupported,
  logEvent,
} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export let analytics: Analytics | null = null;
isSupported()
  .then((isSupported) => {
    if (isSupported) analytics = getAnalytics(firebaseApp);
  })
  .catch(console.log);
export const WrappedLogEvent = (
  event: "search" | "chatbot_toggle" | "chat" | "clicked_on_movie_suggestion",
  eventArguments: {
    [x: string]: any;
    state?: string;
    search_term?: string;
    chatSource?: "ai-suggestion" | "manual-input";
    movie_name?: string;
  }
) => {
  try {
    if (!analytics) return;
    switch (event) {
      case "chatbot_toggle": {
        logEvent(analytics, "chatbot_toggle", {
          state: eventArguments.state,
        });
        break;
      }
      case "search": {
        logEvent(analytics, "search", {
          search_term: eventArguments.search_term,
        });
        break;
      }
      case "chat": {
        logEvent(analytics, "chat", {
          chatSource: eventArguments.chatSource,
        });
        break;
      }
      case "clicked_on_movie_suggestion": {
        logEvent(analytics, "chat", {
          movie_name: eventArguments.movie_name,
        });
        break;
      }
      default:
        break;
    }
  } catch (error) {}
};
