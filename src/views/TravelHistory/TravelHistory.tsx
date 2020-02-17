import React, {useState} from 'react';
import {Page, Card, Layout} from '@shopify/polaris';

import {
  ManageTripCard,
  RandomQuote,
  TripDetailsCard,
  UpcomingTripsCard,
} from './components';
import {trips} from './mockTrips';

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
            <ManageTripCard onClose={() => setNewTripFormOpen(false)} />
          )}
          <Card sectioned>
            <RandomQuote />
          </Card>
          {trips.map((trip) => (
            <TripDetailsCard key={trip.location + trip.id} {...trip} />
          ))}
        </Layout.Section>
        <Layout.Section secondary>
          <UpcomingTripsCard list={trips.filter(({completed}) => !completed)} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
