import React from 'react';
import Favicon from 'react-favicon';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {TravelHistory} from 'views';
import {isDevelopment, publicURL} from 'config';

import './App.scss';

export function App() {
  return (
    <>
      <AppProvider i18n={enTranslations}>
        {isDevelopment && <DevelopmentHead />}
        <TravelHistory />
      </AppProvider>
    </>
  );
}

function DevelopmentHead() {
  return (
    <>
      <Favicon url={`${publicURL}/favicons/development/favicon.ico`} />
      <aside className="DevStatus">
        <strong>development</strong> mode
      </aside>
    </>
  );
}
