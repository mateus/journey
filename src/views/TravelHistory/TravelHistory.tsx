import React from 'react';
import {Page, Card, Layout, SkeletonBodyText, Stack} from '@shopify/polaris';

import {NewTripCard} from './components';

export function TravelHistory() {
  return (
    <Page title="Travel History">
      <Layout>
        <Layout.Section>
          <NewTripCard />
          <Card title="Past trips" sectioned>
            <Stack vertical spacing="loose">
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
