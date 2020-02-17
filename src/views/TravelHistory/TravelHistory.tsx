import React from 'react';
import {Page, Card, Layout, SkeletonBodyText, Stack} from '@shopify/polaris';

import {NewTripCard, RandomQuote} from './components';

export function TravelHistory() {
  return (
    <Page title="Travel History">
      <Layout>
        <Layout.Section>
          <NewTripCard />
          <Card title="Journey" sectioned>
            <Stack vertical spacing="loose">
              <RandomQuote />
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Notes" sectioned subdued>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
