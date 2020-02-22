import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button';
import {Redirect} from 'react-router-dom';
import {DisplayText, Stack} from '@shopify/polaris';

import {auth, provider} from 'utilities/firebase';
import {Loading} from 'components';

import './Login.scss';

export function Login() {
  const [user, initialising, error] = useAuthState(auth);

  const login = () => {
    auth.signInWithPopup(provider);
  };

  if (initialising) {
    return <Loading />;
  }

  if (error) throw new Error(error.message);

  if (user) {
    return <Redirect to={{pathname: '/travels'}} />;
  }

  return (
    <div className="Login">
      <Stack vertical alignment="center" spacing="extraLoose">
        <DisplayText size="extraLarge">Login</DisplayText>
        <GoogleButton onClick={login} />
      </Stack>
    </div>
  );
}
