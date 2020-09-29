import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        //setUserObj(user);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        // No user is signed in.
        setUserObj(null);
      }
      setInit(true)
    });
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser;
    //setUserObj(Object.assign({}, user))
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    })
  }
  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}></AppRouter> : "Initializing...."}
      <footer>&copy;{new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
