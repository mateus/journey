import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Navigation, TopBar, Frame as PolarisFrame} from '@shopify/polaris';
import {
  TransportMajorTwotone,
  LogOutMinor,
  GlobeMajorTwotone,
  ChecklistMajorTwotone,
  NoteMajorTwotone,
} from '@shopify/polaris-icons';

import {auth} from 'utilities/firebase';

import {TopNav, Footer} from './components';

export interface FrameProps {
  children?: React.ReactChild;
}

export function Frame({children}: FrameProps) {
  const history = useHistory();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location={history.location.pathname}>
      <TopNav />
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
            label: 'Future Plans',
            onClick: () => pushTo('/plans'),
            selected: history.location.pathname === '/plans',
            icon: NoteMajorTwotone,
          },
          {
            label: 'Wonders of the World',
            onClick: () => pushTo('/wonders'),
            selected: history.location.pathname === '/wonders',
            icon: GlobeMajorTwotone,
          },
          {
            label: 'Bucket List',
            onClick: () => pushTo('/bucket-list'),
            selected: history.location.pathname === '/bucket-list',
            icon: ChecklistMajorTwotone,
          },
        ]}
        separator
        fill
      />
      <Navigation.Section
        items={[
          {
            onClick: logout,
            label: 'Log out',
            icon: LogOutMinor,
          },
        ]}
        separator
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
