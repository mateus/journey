import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button';
import {Redirect} from 'react-router-dom';
import {DisplayText, Stack, Spinner} from '@shopify/polaris';

import {auth, provider} from 'utilities/firebase';

import './Login.scss';

export function Login() {
  const [user, initialising, error] = useAuthState(auth);

  const login = () => {
    auth.signInWithPopup(provider);
  };

  const LoginFrame = ({children}: {children: React.ReactNode}) => {
    return (
      <div className="Login">
        <Stack vertical alignment="center" distribution="center">
          {children}
        </Stack>
      </div>
    );
  };

  if (initialising) {
    return (
      <LoginFrame>
        <Spinner accessibilityLabel="Initialising" size="large" color="teal" />
      </LoginFrame>
    );
  }

  if (error) throw new Error(error.message);

  if (user) {
    return <Redirect to={{pathname: '/travels'}} />;
  }

  return (
    <LoginFrame>
      <Stack vertical alignment="center" spacing="extraLoose">
        <DisplayText size="extraLarge">Login</DisplayText>
        <GoogleButton onClick={login} />
      </Stack>
    </LoginFrame>
  );
}
