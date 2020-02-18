import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';

import {TravelHistory} from 'views';
import {isDevelopment} from 'config';

import {DevelopmentHead, TopNav, Footer} from './components';

export function App() {
  // Add a Single Query Request for all the pages

  return (
    <>
      {isDevelopment && <DevelopmentHead />}
      <AppProvider i18n={enTranslations}>
        <TopNav />
        <TravelHistory trips={undefined} />
        <Footer />
      </AppProvider>
    </>
  );
}
