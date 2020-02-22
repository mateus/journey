import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {useAuthState} from 'react-firebase-hooks/auth';
import {BrowserRouter as Router} from 'react-router-dom';

import {auth} from 'utilities/firebase';
import {isDevelopment} from 'config';

import {Routes} from '../Routes';

import {DevelopmentHead} from './components';

export function App() {
  const [user, initialising, error] = useAuthState(auth);
  // Add a Single Query Request for all the pages

  return (
    <Router>
      {isDevelopment && <DevelopmentHead />}
      <AppProvider i18n={enTranslations}>
        <Routes />
      </AppProvider>
    </Router>
  );
}
