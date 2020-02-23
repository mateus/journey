import React from 'react';
import GoogleButton from 'react-google-button';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect} from 'react-router-dom';
import {User} from 'firebase';
import {DisplayText, Stack} from '@shopify/polaris';

import {auth, provider, firestore} from 'utilities/firebase';
import {Loading} from 'components';

import './Login.scss';

export function Login() {
  const [user, initialising, error] = useAuthState(auth);

  if (initialising) {
    return <Loading />;
  }

  if (error) throw new Error(error.message);

  if (user) {
    return <Redirect to={{pathname: '/'}} />;
  }

  return (
    <div className="Login">
      <Stack vertical alignment="center" spacing="extraLoose">
        <DisplayText size="extraLarge">Login</DisplayText>
        <GoogleButton onClick={handleLogin} />
      </Stack>
    </div>
  );

  function handleLogin() {
    auth
      .signInWithPopup(provider)
      .then((cred) => {
        if (cred.user) {
          storeUserData(cred.user);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  function storeUserData(user: User) {
    firestore
      .collection('users')
      .doc(user.uid)
      .set({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });
  }
}
