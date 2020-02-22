import React from 'react';
import {Avatar, Image, Stack, Spinner, DisplayText} from '@shopify/polaris';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect} from 'react-router-dom';

import {auth} from 'utilities/firebase';

import './TopNav.scss';

export function TopNav() {
  const [user, initialising, error] = useAuthState(auth);

  if (initialising) {
    return <Spinner />;
  }

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    return <Redirect to={{pathname: '/login'}} />;
  }

  const {photoURL, displayName} = user;

  return (
    <nav className="TopNav">
      <Stack vertical spacing="extraTight" alignment="center">
        {photoURL !== null && displayName !== null && (
          <Avatar name={displayName} customer size="large" source={photoURL} />
        )}
        {displayName !== null && (
          <DisplayText size="small">{displayName}</DisplayText>
        )}
      </Stack>
    </nav>
  );
}
