import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider as PolarisAppProvider} from '@shopify/polaris';
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
      <PolarisAppProvider theme={theme} i18n={enTranslations}>
        <Routes />
      </PolarisAppProvider>
    </Router>
  );
}
