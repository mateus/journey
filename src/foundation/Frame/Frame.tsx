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
    <Navigation location={history.location.pathname}>
      <TopNav />
      <Navigation.Section
        title="Journey App"
        items={[
          {
            onClick: () => pathTo('/'),
            exactMatch: true,
            label: 'Travel History',
            icon: TransportMajorTwotone,
          },
          {
            onClick: () => pathTo('/plans'),
            exactMatch: true,
            label: 'Future Plans',
            icon: NoteMajorTwotone,
          },
          {
            onClick: () => pathTo('/wonders'),
            exactMatch: true,
            label: 'Wonders of the World',
            icon: GlobeMajorTwotone,
          },
          {
            onClick: () => pathTo('/bucket-list'),
            exactMatch: true,
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

  function pathTo(path: string) {
    if (history.location.pathname === path) return;
    history.push(path);
  }
}
