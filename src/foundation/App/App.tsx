import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {BrowserRouter as Router} from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider as PolarisProvider} from '@shopify/polaris';

import {AppContextProvider} from 'components';
import {isDevelopment} from 'config';
import {Frame, Routes} from 'foundation';
import {auth} from 'utilities/firebase';

import {DevelopmentHead} from './components';

export function App() {
  const [user] = useAuthState(auth);

  const theme = {
    colors: {
      topBar: {
        background: '#202E78',
      },
    },
  };

  alert('<App /> Called again??');

  return (
    <Router>
      {isDevelopment && <DevelopmentHead />}
      <PolarisProvider theme={theme} i18n={enTranslations}>
        <AppContextProvider data={{app: {user}}}>
          <Frame>
            <Routes />
          </Frame>
        </AppContextProvider>
      </PolarisProvider>
    </Router>
  );
}
