import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "telega-clone.firebaseapp.com",
  projectId: "telega-clone",
  storageBucket: "telega-clone.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_ID,
  appId: import.meta.env.VITE_API_ID,
  measurementId: import.meta.VITE_MESUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
export const todosRef = collection(db, "todos");
