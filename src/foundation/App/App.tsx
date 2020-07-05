import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {BrowserRouter as Router} from 'react-router-dom';

import {isDevelopment} from 'config/variables';
import {Routes} from 'foundation';
import {JorneyLogo} from 'assets';

import {DevelopmentHead} from './components';

export function App() {
  const theme = {
    colors: {
      topBar: {
        background: '#444052',
      },
    },
    logo: {
      width: 30,
      topBarSource: JorneyLogo,
      url: window.location.origin,
      accessibilityLabel: 'Journey',
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
