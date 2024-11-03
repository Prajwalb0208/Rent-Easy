import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAHTaJx5J4nxIucCSP6j_4Zem0FCpnPFM8",
  authDomain: "rent-easy-af2ca.firebaseapp.com",
  projectId: "rent-easy-af2ca",
  storageBucket: "rent-easy-af2ca.firebasestorage.app",
  messagingSenderId: "164802569013",
  appId: "1:164802569013:web:d1c3dd09e83a989c9d227c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signup = (username, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed up:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error signing up:', error);
    });
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Logged in:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error logging in:', error);
    });
};

export const logout = () => {
  return signOut(auth)
    .then(() => {
      console.log('Logged out');
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
};

// Add Google Sign-In Functionality
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('Google sign-in successful:', user);
      return user; // Return the user for further use
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('Error signing in with Google:', errorCode, errorMessage);
    });
};
