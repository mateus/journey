import React from 'react';
import GoogleButton from 'react-google-button';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect} from 'react-router-dom';
import {User} from 'firebase';
import {DisplayText, EmptyState, Stack} from '@shopify/polaris';

import {EmptyStateLogin} from 'assets';
import {auth, provider, firestore} from 'utilities/firebase';
import {useAppContext} from 'hooks/useAppContext';
import {LoadingPage, RandomQuote} from 'components';

import './Login.scss';

export function Login() {
  const {
    app: {user},
  } = useAppContext();

  if (user) {
    alert('Login in page WITH user');
    return <Redirect to={{pathname: '/'}} />;
  }

  return (
    <EmptyState
      image={EmptyStateLogin}
      footerContent={
        <div className="LoginTextContainer">
          <RandomQuote />
        </div>
      }
    >
      <Stack vertical>
        <DisplayText size="extraLarge">
          <span className="Brand">Journey app</span>
        </DisplayText>
        <div className="LoginTextContainer">
          <p>A personal travel cataloge and trip manager</p>
        </div>
        <GoogleButton onClick={handleLogin} />
      </Stack>
    </EmptyState>
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
