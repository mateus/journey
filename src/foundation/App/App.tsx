import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {BrowserRouter as Router} from 'react-router-dom';

import {isDevelopment} from 'config';
import {Routes} from 'foundation';

import {DevelopmentHead} from './components';

export function App() {
  const theme = {
    colors: {
      topBar: {
        background: '#202E78',
      },
    },
  };

  return (
    <Router>
      {isDevelopment && <DevelopmentHead />}
      <AppProvider theme={theme} i18n={enTranslations}>
        <Routes />
      </AppProvider>
    </Router>
  );
}
