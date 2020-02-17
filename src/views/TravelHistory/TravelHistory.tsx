import React, {useState} from 'react';
import {Page, Card, Layout, DisplayText, Stack} from '@shopify/polaris';

import {
  ManageTripCard,
  RandomQuote,
  TripDetailsCard,
  UpcomingTripsCard,
} from './components';
import {trips} from './mockTrips';

export function TravelHistory() {
  const [newTripFormOpen, setNewTripFormOpen] = useState(false);

  const upcomingTrips = trips.filter(({completed}) => !completed);

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
          <Stack vertical>
            {newTripFormOpen && (
              <ManageTripCard onClose={() => setNewTripFormOpen(false)} />
            )}
            <Card sectioned>
              <RandomQuote />
            </Card>
            {trips.map((trip) => (
              <TripDetailsCard key={trip.location + trip.id} {...trip} />
            ))}
            <Stack distribution="center">
              <DisplayText size="extraLarge">2018</DisplayText>
            </Stack>
          </Stack>
        </Layout.Section>
        <Layout.Section secondary>
          <UpcomingTripsCard list={upcomingTrips} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
