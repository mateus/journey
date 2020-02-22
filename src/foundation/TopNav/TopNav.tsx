import React from 'react';
import {
  Avatar,
  Icon,
  Link,
  TextStyle,
  Stack,
  Spinner,
  DisplayText,
} from '@shopify/polaris';
import {GlobeMinor} from '@shopify/polaris-icons';
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
      <Stack vertical alignment="center" spacing="extraTight">
        <Stack vertical alignment="center" spacing="tight">
          {photoURL !== null && displayName !== null && (
            <Avatar
              name={displayName}
              customer
              size="large"
              source={photoURL}
            />
          )}
          {displayName !== null && (
            <Stack vertical spacing="none" alignment="center">
              <DisplayText size="small" element="h2">
                <TextStyle variation="strong">{displayName}</TextStyle>
              </DisplayText>
            </Stack>
          )}
        </Stack>
        <Link url="https://www.google.com/maps/timeline" external>
          <Icon
            source={GlobeMinor}
            backdrop
            color="inkLighter"
            accessibilityLabel="Google Timeline"
          />
        </Link>
      </Stack>
    </nav>
  );
}
