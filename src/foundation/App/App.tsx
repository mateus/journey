import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {BrowserRouter as Router} from 'react-router-dom';

import {isDevelopment} from 'config';

import {Routes} from '../Routes';

import {DevelopmentHead} from './components';

export function App() {
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
