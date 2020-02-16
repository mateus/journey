import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {TravelHistory} from 'views';

export function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <TravelHistory />
    </AppProvider>
  );
}
