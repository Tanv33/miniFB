import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import dotenv from "dotenv";
dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.ADMIN_APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};
const firebaseApp = initializeApp(firebaseConfig);

// Option 2: Access Firebase services using shorthand notation
export const storage = getStorage(firebaseApp);
