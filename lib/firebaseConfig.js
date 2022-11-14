import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth"
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
} from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Auth exports
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider(app)
export const facebookAuthProvider = new FacebookAuthProvider(app)

// Firestore exports
export const db = getFirestore(app)

// Storage exports
export const storage = getStorage(app)
export const STATE_CHANGE = "state_changed"

// Helper function
/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  // userRef = collection("user")
  // const query = userRef.where("username", "==", username).limit(1)

  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    limit(1)
  )

  const userDoc = (await getDocs(q)).docs[0]
  return userDoc
}

/**
 * Gets a provinces/{province} document with username
 * @param {string} username
 */
export async function getPostsWithProvince(province) {
  // userRef = collection("user")
  // const query = userRef.where("username", "==", province).limit(1)

  const q = query(
    collection(db, "provinces"),
    where("province", "==", province),
    limit(1)
  )

  const provinceDocs = (await getDocs(q)).docs[0]
  return provinceDocs
}

// export async function getProvinces() {

// }

/**
 * Convert a fireStore document to JSON
 * @param {DocumentSnapShot} doc
 */
export function postToJSON(doc) {
  const data = doc.data()
  return {
    ...data,
    // firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt?.toMillis() || 0,
    updatedAt: data?.updatedAt?.toMillis() || 0,
  }
}
