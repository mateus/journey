import React, {useState, useCallback} from 'react';
import {
  Card,
  ActionList,
  Navigation,
  TopBar,
  Frame as PolarisFrame,
} from '@shopify/polaris';
import {
  TransportMajorTwotone,
  LogOutMinor,
  GlobeMajorTwotone,
  ChecklistMajorTwotone,
  NoteMajorTwotone,
} from '@shopify/polaris-icons';

import {auth} from 'utilities/firebase';

import {TopNav} from '../TopNav';
import {Footer} from '../Footer';

export interface FrameProps {
  children?: React.ReactChild;
}

export function Frame({children}: FrameProps) {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const toggleMobileNavigationActive = () =>
    setMobileNavigationActive(
      (mobileNavigationActive) => !mobileNavigationActive,
    );

  const logout = () => {
    auth.signOut();
  };

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <TopNav />
      <Navigation.Section
        title="Journey App"
        items={[
          {
            url: '/',
            label: 'Travel History',
            icon: TransportMajorTwotone,
          },
          {
            url: '/plans',
            disabled: true,
            label: 'Future Plans',
            icon: NoteMajorTwotone,
          },
          {
            url: '/wonders',
            disabled: true,
            label: 'Wonders of the World',
            icon: GlobeMajorTwotone,
          },
          {
            url: '/bucket-list',
            disabled: true,
            label: 'Bucket List',
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
}
