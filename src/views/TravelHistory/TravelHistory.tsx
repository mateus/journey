import React, {useState} from 'react';
import {Page, Card, Layout, DisplayText, Stack} from '@shopify/polaris';
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
import {mockTrips} from './tests/fixtures/mockTrips';
import './TravelHistory.scss';

export interface TravelHistoryProps {
  trips?: Trip[];
}

// Connected with Mock Trips for now to make it easier to test it. Single Query App.
export function TravelHistory({trips = mockTrips}: TravelHistoryProps) {
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
        {content: 'Export', icon: ExportMinor},
      ]}
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
    </Page>
  );
}
