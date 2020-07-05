import React, {useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Navigation, TopBar, Frame as PolarisFrame} from '@shopify/polaris';
import {
  TransportMajorTwotone,
  LogOutMinor,
  GlobeMajorTwotone,
  ChecklistMajorTwotone,
  NoteMajorTwotone,
  GlobeMinor,
} from '@shopify/polaris-icons';

import {auth} from 'utilities/firebase';

import {Footer} from './components';

export interface FrameProps {
  children?: React.ReactChild;
}

export function Frame({children}: FrameProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user] = useAuthState(auth);
  const history = useHistory();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    [],
  );

  const userMenuMarkup = user ? (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            {
              content: 'Google Timeline',
              icon: GlobeMinor,
              url: 'https://www.google.com/maps/timeline',
              external: true,
            },
            {
              onAction: logout,
              content: 'Log out',
              icon: LogOutMinor,
            },
          ],
        },
      ]}
      initials={user.displayName?.charAt(0)}
      avatar={user.photoURL || undefined}
      name={user.displayName || '...'}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  ) : null;

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location={history.location.pathname}>
      <Navigation.Section
        title="Journey"
        items={[
          {
            label: 'Travel History',
            onClick: () => pushTo('/'),
            selected: history.location.pathname === '/',
            icon: TransportMajorTwotone,
          },
          {
            label: 'Wonders of the World',
            onClick: () => pushTo('/wonders'),
            selected: history.location.pathname === '/wonders',
            icon: GlobeMajorTwotone,
          },
          {
            label: 'Future Plans',
            onClick: () => pushTo('/plans'),
            selected: history.location.pathname === '/plans',
            icon: NoteMajorTwotone,
            disabled: true,
          },
          {
            label: 'Bucket List',
            onClick: () => pushTo('/bucket-list'),
            selected: history.location.pathname === '/bucket-list',
            icon: ChecklistMajorTwotone,
            disabled: true,
          },
        ]}
        separator
        fill
      />
    </Navigation>
  );

  return (
    <PolarisFrame
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
      topBar={topBarMarkup}
    >
      {children}
      <Footer />
    </PolarisFrame>
  );

  function pushTo(path: string) {
    if (history.location.pathname === path) return;
    if (mobileNavigationActive) toggleMobileNavigationActive();
    history.push(path);
  }

  function toggleMobileNavigationActive() {
    setMobileNavigationActive(
      (mobileNavigationActive) => !mobileNavigationActive,
    );
  }

  function logout() {
    auth.signOut();
  }
}
