import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import React, { useState, useEffect } from "react";
import axios from "axios";

// LoginSuccessful is a function sent in by parent component
function LoginForm({ LoginEvent }) {
  const firebaseConfig = {
    apiKey: "AIzaSyCdK09hLi7oLNxsh-AZwtNvfqmSKuvr3Rg",
    authDomain: "mastermindlogin-b2e81.firebaseapp.com",
    projectId: "mastermindlogin-b2e81",
    storageBucket: "mastermindlogin-b2e81.appspot.com",
    messagingSenderId: "653245994197",
    appId: "1:653245994197:web:1fe400a4afa3007066be5c",
    measurementId: "G-KJRTL1DKDH",
  };

  initializeApp(firebaseConfig);

  const [loggedUser, setLoggedUser] = useState("");
  const [handle, setHandle] = useState(""); // Add this line

  // function to sign in with Google's page
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
      .then((result) => {
        // User signed in
        console.log(result.user);
        setLoggedUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  };

  // function to sign out
  function logoutGoogle() {
    const auth = getAuth();
    auth.signOut();
    setLoggedUser(null);
  }

  // we put the onAuthStateChanged in useEffect so this is only called when
  // this component mounts
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // Assuming you have the handle value from your component state
        LoginEvent(user);
        console.log("User is signed in:", user);
        setLoggedUser(user);
      } else {
        // No user is signed in.
        console.log("No user is signed in.");
      }
      //LoginEvent(user, handle);
    });
  }, []);
  // note the ? to show either login or logout button
  return (
    <div>
      {loggedUser ? (
        <>
          <p>user: {loggedUser.uid}</p>{" "}
          <button onClick={logoutGoogle}>Log out</button>{" "}
        </>
      ) : (
        <>
          <p>Please log in to play the game.</p>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </>
      )}
    </div>
  );
}
export default LoginForm;
