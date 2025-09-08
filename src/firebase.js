// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6hOQ28rtwMSQqkw3AWljgpYXMvQjk5V4",
    authDomain: "auditor-web.firebaseapp.com",
    projectId: "auditor-web",
    storageBucket: "auditor-web.appspot.com", // <-- แก้ไขตรงนี้
    messagingSenderId: "766253849006",
    appId: "1:766253849006:web:1f1d26adb26d1df9f5d03f",
    measurementId: "G-JY4F8R135Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
export const analytics = getAnalytics(app);