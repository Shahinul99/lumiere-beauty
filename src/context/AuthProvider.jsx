import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

// Turn raw Firebase error codes into messages a shopper can act on
export const friendlyError = (error) => {
  const messages = {
    "auth/email-already-in-use": "That email already has an account. Try signing in instead.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Email or password is incorrect.",
    "auth/weak-password": "Choose a stronger password (at least 6 characters).",
    "auth/too-many-requests": "Too many attempts. Wait a few minutes and try again.",
    "auth/popup-closed-by-user": "The Google window was closed before sign-in finished.",
    "auth/network-request-failed": "Network problem. Check your connection and retry.",
  };
  return messages[error?.code] || "Something went wrong. Please try again.";
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fires on login, logout, and every page refresh once Firebase restores the session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    await sendEmailVerification(cred.user);
    // Same object reference, so re-set state to make consumers re-render with the new name
    setUser({ ...cred.user, displayName: name });
    return cred;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // The Google account's profile photo arrives automatically as user.photoURL
  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const resendVerification = () => sendEmailVerification(auth.currentUser);

  const value = {
    user,
    loading,
    register,
    login,
    googleLogin,
    logout,
    resetPassword,
    resendVerification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
