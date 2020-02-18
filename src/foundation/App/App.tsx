import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';

import {TravelHistory} from 'views';
import {isDevelopment} from 'config';

import {DevelopmentHead, TopNav, Footer} from './components';

export function App() {
  return (
    <>
      <AppProvider i18n={enTranslations}>
        {isDevelopment && <DevelopmentHead />}
        <TopNav />
        <TravelHistory trips={undefined} />
        <Footer />
      </AppProvider>
    </>
  );
}
