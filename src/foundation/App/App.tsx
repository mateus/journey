import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';

export function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Page title="Journey">
        <Card sectioned>
          <Button onClick={() => {}}>Example button</Button>
        </Card>
      </Page>
    </AppProvider>
  );
}
