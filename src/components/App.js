import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        // No user is signed in.
        setIsLoggedIn(false);
      }
      setInit(true)
    });
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}></AppRouter> : "Initializing...."}
      <footer>&copy;{new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
