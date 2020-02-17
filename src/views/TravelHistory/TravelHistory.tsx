import React from 'react';
import {Page, Card, Layout, SkeletonBodyText, Stack} from '@shopify/polaris';

import {NewTripCard, RandomQuote, UpcomingTripsCard} from './components';

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
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <UpcomingTripsCard
            list={[
              {
                location: 'Some awesome location',
                startDate: 'Mar 16, 2020',
                endDate: 'Mar 28, 2020',
              },
              {
                location: 'Another location',
                startDate: 'Sept 01, 2020',
                endDate: 'Sept 17, 2020',
              },
            ]}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
