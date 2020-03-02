import React, {useState} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import moment from 'moment';
import faker from 'faker';
import {ImportMinor, ExportMinor} from '@shopify/polaris-icons';
import {Page, EmptyState, Layout, DisplayText, Stack} from '@shopify/polaris';

import {EmptyStateAirportDude} from 'assets';
import {auth, firestore} from 'utilities/firebase';
import {isPastDate} from 'utilities/dates';
import {useToast} from 'hooks/useToast';
import {Trip, QueryTripCollection} from 'types';
import {DocumentTitle, MemoizedRandomQuote, LoadingPage} from 'components';

import {tripsByYear, upcomingTrips} from './utilities';
import {
  ImportTripsModal,
  ManageTripCard,
  MemoizedTripDetailsCard,
  UpcomingTripsCard,
} from './components';
import './TravelHistory.scss';

export function TravelHistory() {
  const [newTripFormOpen, setNewTripFormOpen] = useState(false);
  const [importTripsModalOpen, setImportTripsModalOpen] = useState(false);
  const [importing, setImporting] = useState(false);
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
        {
          content: 'Import',
          icon: ImportMinor,
          onAction: () => setImportTripsModalOpen(true),
        },
        {
          content: 'Export',
          icon: ExportMinor,
          disabled: reconciledTrips?.length === 0,
        },
      ]}
    >
      <DocumentTitle title="Travel History" />
      {renderTrips(reconciledTrips)}
      <EmptyState image={EmptyStateAirportDude}>
        <MemoizedRandomQuote />
      </EmptyState>
      <ImportTripsModal
        open={importTripsModalOpen}
        loading={importing}
        onClose={() => setImportTripsModalOpen(false)}
        onConfirmed={handleImportTrips}
      />
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
                onAddNew={handleAddNewTrip}
                onUpdate={handleUpdateTrip}
                onDelete={handleDeleteTrip}
              />
            )}
            {Object.keys(byYear)
              .reverse()
              .map((year) => {
                return (
                  <div key={year}>
                    {byYear[year].map((trip) => (
                      <MemoizedTripDetailsCard
                        {...trip}
                        completed={isPastDate(trip.endDate)}
                        key={
                          trip.startDate + trip.location + faker.random.uuid()
                        }
                        onAddNew={handleAddNewTrip}
                        onUpdate={handleUpdateTrip}
                        onDelete={handleDeleteTrip}
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

  async function handleImportTrips(trips: Trip[]) {
    setImporting(true);
    // It would be better to batch all the trips together instead of add each at a time
    Promise.all(
      trips.map(async (trip) => {
        await handleAddNewTrip(trip, true);
      }),
    )
      .then(() => {
        setImporting(false);
        setImportTripsModalOpen(false);
        showToast({content: `${trips.length} trips imported`});
      })
      .catch(() => {
        throw new Error('Error importing trips');
      });
  }

  async function handleAddNewTrip(trip: Trip, importing = false) {
    // trip.id represents the Document ID, we don't have to include it as a value
    delete trip.id;
    if (tripsCollectionRef) {
      await tripsCollectionRef
        .add({
          ...trip,
          createdAt: moment().toDate(),
        })
        .then(() => {
          if (!importing) {
            setNewTripFormOpen(false);
            showToast({content: `Trip to ${trip.location} added`});
          }
        });
    }
  }

  async function handleUpdateTrip(trip: Trip) {
    const docID = trip.id;
    // trip.id represents the Document ID, we don't have to include it as a value
    delete trip.id;
    if (tripsCollectionRef) {
      await tripsCollectionRef
        .doc(docID)
        .update({
          ...trip,
          updatedAt: moment().toDate(),
        })
        .then(() => {
          showToast({content: `Trip to ${trip.location} updated`});
        });
    }
  }

  async function handleDeleteTrip(trip: Trip) {
    const docID = trip.id;
    if (tripsCollectionRef) {
      await tripsCollectionRef
        .doc(docID)
        .delete()
        .then(() => {
          showToast({content: `Trip to ${trip.location} removed`});
        });
    }
  }
}
