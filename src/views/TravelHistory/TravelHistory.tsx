import React, {useState} from 'react';
import {
  Page,
  Card,
  EmptyState,
  Layout,
  DisplayText,
  Stack,
} from '@shopify/polaris';
import {ImportMinor, ExportMinor} from '@shopify/polaris-icons';
import moment from 'moment';

import {Trip} from 'types';

import {insertOrdered, sortByStartDateAsc} from './utilities';
import {
  ManageTripCard,
  RandomQuote,
  TripDetailsCard,
  UpcomingTripsCard,
} from './components';
import './TravelHistory.scss';

export interface TravelHistoryProps {
  trips: Trip[];
}

export function TravelHistory({trips}: TravelHistoryProps) {
  const [newTripFormOpen, setNewTripFormOpen] = useState(false);

  const tripsByYear = trips.reduce((map, trip) => {
    const year = moment(trip.endDate).year();
    if (map[year]) {
      map[year] = insertOrdered(trip, map[year], {desc: true});
    } else {
      map[year] = [trip];
    }
    return map;
  }, {} as {[key: string]: Trip[]});

  const upcomingTrips = trips
    .filter(({completed}) => !completed)
    .sort(sortByStartDateAsc);

  const manageTripCardMarkup = (
    <ManageTripCard onClose={() => setNewTripFormOpen(false)} />
  );

  const emptyStateMarkup = newTripFormOpen ? (
    <Layout>
      <Layout.Section>{manageTripCardMarkup}</Layout.Section>
      <Layout.Section secondary></Layout.Section>
    </Layout>
  ) : (
    <EmptyState image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg">
      <RandomQuote />
    </EmptyState>
  );

  const content =
    trips.length > 0 ? (
      <Layout>
        <Layout.Section>
          <Stack vertical>
            {newTripFormOpen && manageTripCardMarkup}
            <Card sectioned>
              <RandomQuote />
            </Card>
            {Object.keys(tripsByYear)
              .reverse()
              .map((year) => {
                return (
                  <div key={year}>
                    {tripsByYear[year].map((trip) => (
                      <TripDetailsCard
                        key={trip.location + trip.id}
                        {...trip}
                      />
                    ))}
                    <div className="Separator">
                      <DisplayText size="extraLarge">{year}</DisplayText>
                    </div>
                  </div>
                );
              })}
          </Stack>
        </Layout.Section>
        <Layout.Section secondary>
          <UpcomingTripsCard list={upcomingTrips} />
        </Layout.Section>
      </Layout>
    ) : (
      emptyStateMarkup
    );

  return (
    <Page
      title="Travel History"
      primaryAction={{
        content: 'Add trip',
        disabled: newTripFormOpen,
        onAction: () => setNewTripFormOpen(!newTripFormOpen),
      }}
      secondaryActions={[
        {content: 'Import', icon: ImportMinor},
        {content: 'Export', icon: ExportMinor, disabled: trips.length === 0},
      ]}
    >
      {content}
    </Page>
  );
}
