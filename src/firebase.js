import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBHkJZbU8b5WFkVcQqGw5v_SaTPs3L51Lw",
    authDomain: "trivizard-16ee4.firebaseapp.com",
    projectId: "trivizard-16ee4",
    storageBucket: "trivizard-16ee4.firebasestorage.app",
    messagingSenderId: "651422845001",
    appId: "1:651422845001:web:f8f022eb87fb34e25d1798",
  };

  const app = initializeApp(firebaseConfig);

// Export Firestore (and analytics ONLY if you need it)
export const db = getFirestore(app);