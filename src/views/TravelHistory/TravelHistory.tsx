import React, {useState} from 'react';
import {Page, Card, Layout, SkeletonBodyText, Stack} from '@shopify/polaris';

import {NewTripCard, RandomQuote, UpcomingTripsCard} from './components';

export function TravelHistory() {
  const [newTripFormOpen, setNewTripFormOpen] = useState(false);

  return (
    <Page
      title="Travel History"
      primaryAction={{
        content: 'Add trip',
        disabled: newTripFormOpen,
        onAction: () => setNewTripFormOpen(!newTripFormOpen),
      }}
    >
      <Layout>
        <Layout.Section>
          {newTripFormOpen && (
            <NewTripCard onClose={() => setNewTripFormOpen(false)} />
          )}
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
