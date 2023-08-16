import { Injectable } from '@nestjs/common';
import { initializeApp } from "firebase/app";
import * as admin from 'firebase-admin'
import { getAuth } from "firebase/auth";
import * as dotenv from 'dotenv'

dotenv.config()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINSENDER,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTEID,
};

@Injectable()
export class FirebaseService {
  connect() {
    const app = initializeApp(firebaseConfig);
    admin.initializeApp(firebaseConfig);
    getAuth(app);
  }
}