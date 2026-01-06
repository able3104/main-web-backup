import { initializeApp } from "firebase/app";
import { getAuth, OAuthProvider } from "firebase/auth";

// Firebase 초기화
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Firebase 인증 설정
const auth = getAuth(app);
// Google 인증 제공자 설정

const kakaoProvider = new OAuthProvider("oidc.kakao");

export { app, auth, kakaoProvider };
