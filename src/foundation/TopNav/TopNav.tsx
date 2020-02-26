import React from 'react';
import {
  Avatar,
  Icon,
  Link,
  TextStyle,
  Stack,
  DisplayText,
} from '@shopify/polaris';
import {GlobeMinor} from '@shopify/polaris-icons';
import {useAuthState} from 'react-firebase-hooks/auth';

import {auth} from 'utilities/firebase';

import './TopNav.scss';

export function TopNav() {
  const [user] = useAuthState(auth);

  return (
    <nav className="TopNav">
      <Stack vertical alignment="center" spacing="extraTight">
        <Stack vertical alignment="center" spacing="tight">
          {user?.photoURL !== null && user?.displayName !== null && (
            <Avatar
              name={user?.displayName}
              customer
              size="large"
              source={user?.photoURL}
            />
          )}
          <Stack vertical spacing="none" alignment="center">
            <DisplayText size="small" element="h2">
              <TextStyle variation="strong">
                {user?.displayName || '...'}
              </TextStyle>
            </DisplayText>
          </Stack>
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
