import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {BrowserRouter as Router} from 'react-router-dom';

import {isDevelopment} from 'config/variables';
import {Routes} from 'foundation';

import {DevelopmentHead} from './components';

export function App() {
  const theme = {
    colors: {
      topBar: {
        background: '#202E78',
      },
    },
    logo: {
      width: 124,
      topBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
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
