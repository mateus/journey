import React, {useState} from 'react';
import {Page, Card, Layout, DisplayText, Stack} from '@shopify/polaris';
import {ImportMinor, ExportMinor} from '@shopify/polaris-icons';
import moment from 'moment';

import {Trip} from 'types';

import {
  ManageTripCard,
  RandomQuote,
  TripDetailsCard,
  UpcomingTripsCard,
} from './components';
import {mockTrips} from './mockTrips';
import './TravelHistory.scss';

export function TravelHistory() {
  const [newTripFormOpen, setNewTripFormOpen] = useState(false);

  const tripsByYear = mockTrips.reduce((map, trip) => {
    const year = moment(trip.endDate).year();
    if (map[year]) {
      map[year] = insertOrdered(trip, map[year]);
    } else {
      map[year] = [trip];
    }
    return map;
  }, {} as {[key: string]: Trip[]});

  const upcomingTrips = mockTrips
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

function insertOrdered(trip: Trip, array: Trip[]): Trip[] {
  array.push(trip);
  array.sort(sortByStartDateDesc);
  return array;
}

function sortByStartDateAsc(tripA: Trip, tripB: Trip) {
  return tripA.startDate < tripB.startDate ? -1 : 0;
}

function sortByStartDateDesc(tripA: Trip, tripB: Trip) {
  return tripA.startDate > tripB.startDate ? -1 : 0;
}
