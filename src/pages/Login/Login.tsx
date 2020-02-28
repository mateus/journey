import React from 'react';
import GoogleButton from 'react-google-button';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect} from 'react-router-dom';
import {User} from 'firebase';
import {DisplayText, EmptyState, Stack} from '@shopify/polaris';

import {EmptyStateAirportDude} from 'assets';
import {auth, provider, firestore} from 'utilities/firebase';
import {LoadingPage, RandomQuote} from 'components';

import './Login.scss';

export function Login() {
  const [user, initialising, error] = useAuthState(auth);

  if (initialising) {
    return <LoadingPage />;
  }

  if (error) throw new Error(error.message);

  if (user) {
    return <Redirect to={{pathname: '/'}} />;
  }

  return (
    <div className="Login">
      <EmptyState
        image={EmptyStateAirportDude}
        footerContent={
          <div className="LoginTextContainer QuoteSpace">
            <RandomQuote small />
          </div>
        }
      >
        <div className="ContentWrapper">
          <Stack vertical>
            <DisplayText size="extraLarge">
              <span className="Brand">Journey app</span>
            </DisplayText>
            <div className="LoginTextContainer">
              <p>A personal travel cataloge and trip manager</p>
            </div>
            <GoogleButton onClick={handleLogin} />
          </Stack>
        </div>
      </EmptyState>
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
