import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHTaJx5J4nxIucCSP6j_4Zem0FCpnPFM8",
  authDomain: "rent-easy-af2ca.firebaseapp.com",
  projectId: "rent-easy-af2ca",
  storageBucket: "rent-easy-af2ca.firebasestorage.app",
  messagingSenderId: "164802569013",
  appId: "1:164802569013:web:d1c3dd09e83a989c9d227c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Function to sign up a customer
export const signup = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Save customer info to Firestore
    await setDoc(doc(db, "customers", userCredential.user.uid), {
      username,
      email,
    });
    console.log('Customer signed up:', userCredential.user);
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

// Function to sign up an owner with email verification
export const verifyOwnerEmail = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Save owner info to Firestore
    await setDoc(doc(db, "owners", userCredential.user.uid), {
      username,
      email,
      verified: false, // Initially set to false until email is verified
    });
    // Send email verification
    await sendEmailVerification(userCredential.user);
    console.log('Owner signup initiated:', userCredential.user);
  } catch (error) {
    console.error('Error signing up owner:', error);
  }
};

// Function to login a user
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Logged in:', userCredential.user);
    return userCredential.user; // Return user for further use
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

// Function to logout a user
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('Logged out');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Function for Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('Google sign-in successful:', user);
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};
