import React, {useState} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import moment from 'moment';
import {ImportMinor, ExportMinor} from '@shopify/polaris-icons';
import {Page, EmptyState, Layout, DisplayText, Stack} from '@shopify/polaris';

import {EmptyStateWomanTraveller} from 'assets';
import {auth, firestore} from 'utilities/firebase';
import {useToast} from 'hooks/useToast';
import {Trip, QueryTripCollection} from 'types';
import {RandomQuote, LoadingPage} from 'components';

import {tripsByYear, upcomingTrips} from './utilities';
import {ManageTripCard, TripDetailsCard, UpcomingTripsCard} from './components';
import './TravelHistory.scss';

export function TravelHistory() {
  const [newTripFormOpen, setNewTripFormOpen] = useState(false);
  const [Toast, showToast] = useToast();
  const [user] = useAuthState(auth);
  const tripsCollectionRef = user
    ? firestore
        .collection('users')
        .doc(user?.uid)
        .collection('trips')
    : null;
  const [tripsSnapshot, loading, error] = useCollection(tripsCollectionRef, {
    snapshotListenOptions: {includeMetadataChanges: true},
  });

  if (loading || !tripsSnapshot) return <LoadingPage />;

  if (error) throw new Error(error.message);

  const tripsData = tripsSnapshot.docs.map<QueryTripCollection>((doc) => {
    return {
      id: doc.id,
      // data() does not have inferred types from firestore
      ...(doc.data() as QueryTripCollection),
    };
  });
  const reconciledTrips = tripsData.map<Trip>(
    ({endDate, startDate, ...rest}) => {
      return {
        ...rest,
        endDate: moment.unix(endDate.seconds).toDate(),
        startDate: moment.unix(startDate.seconds).toDate(),
      };
    },
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
        {
          content: 'Export',
          icon: ExportMinor,
          disabled: reconciledTrips?.length === 0,
        },
      ]}
    >
      {renderTrips(reconciledTrips)}
      <EmptyState image={EmptyStateWomanTraveller}>
        <RandomQuote />
      </EmptyState>
      <Toast />
    </Page>
  );

  function renderTrips(trips: Trip[]) {
    const byYear = tripsByYear(trips);
    const upcoming = upcomingTrips(trips);

    return (
      <Layout>
        <Layout.Section>
          <Stack vertical>
            {newTripFormOpen && (
              <ManageTripCard
                onClose={() => setNewTripFormOpen(false)}
                onSuccess={handleSubmitTrip}
                onRemoved={() => showToast({content: 'New trip added'})}
              />
            )}
            {Object.keys(byYear)
              .reverse()
              .map((year) => {
                return (
                  <div key={year}>
                    {byYear[year].map((trip) => (
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
          {trips.length > 0 && <UpcomingTripsCard list={upcoming} />}
        </Layout.Section>
      </Layout>
    );
  }

  function handleSubmitTrip() {
    setNewTripFormOpen(false);
    showToast({content: 'New trip added'});
  }
}
