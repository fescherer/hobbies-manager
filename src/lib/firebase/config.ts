// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const config  = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};


// When deployed, there are quotes that need to be stripped
Object.keys(config).forEach((key) => {
  const configValue = config[key as keyof typeof config] + "";
  if (configValue.charAt(0) === '"') {
    config[key as keyof typeof config] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseConfig = config;
