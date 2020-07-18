import React, {useState} from 'react';
import moment from 'moment';
import faker from 'faker';
import {DeleteMinor, ImportMinor, ExportMinor} from '@shopify/polaris-icons';
import {
  Card,
  Page,
  EmptyState,
  Layout,
  DisplayText,
  Stack,
  ResourceList,
} from '@shopify/polaris';

import {EmptyStateAirportDude} from 'assets';
import {isPastDate} from 'utilities/dates';
import {useToast} from 'hooks/useToast';
import {Trip} from 'types';
import {
  ConfirmActionModal,
  DocumentTitle,
  MemoizedRandomQuote,
  LoadingPage,
} from 'components';

import {useTrips} from './hooks';
import {tripsByYear, upcomingTrips} from './utilities';
import {
  ImportTripsModal,
  ManageTripModal,
  TripDetails,
  UpcomingTripsCard,
} from './components';
import './TravelHistory.scss';

export function TravelHistory() {
  const [manageTripModalOpen, setManageTripModalOpen] = useState(false);
  const [tripToBeEdited, setTripToBeEdited] = useState<Trip | undefined>(
    undefined,
  );
  const [
    confirmDeleteActionModalOpen,
    setConfirmDeleteActionModalOpen,
  ] = useState(false);
  const [manageTripLoading, setManageTripLoading] = useState(false);
  const [importTripsModalOpen, setImportTripsModalOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [Toast, showToast] = useToast();
  const {trips, tripsCollectionRef, loading, error} = useTrips();

  if (error) throw new Error(error.message);
  if (loading) return <LoadingPage />;

  const upcoming = upcomingTrips(trips);

  const confirmDeleteActionModal = tripToBeEdited ? (
    <ConfirmActionModal
      open={confirmDeleteActionModalOpen}
      loading={manageTripLoading}
      title={`Delete trip to ${tripToBeEdited.location}`}
      details={`Are you sure you want to remove the trip to ${tripToBeEdited.location}?`}
      primaryActionLabel="Remove trip"
      onClose={closeConfirmDeleteTripModal}
      onConfirmed={() => handleDeleteTrip(tripToBeEdited)}
      destructive
    />
  ) : null;

  return (
    <Page
      title="Travel History"
      primaryAction={{
        content: 'Add trip',
        disabled: manageTripModalOpen,
        onAction: () => setManageTripModalOpen(true),
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
          // disabled: reconciledTrips?.length === 0,
          disabled: true,
        },
        {
          content: 'Remove all',
          icon: DeleteMinor,
          disabled: true,
        },
      ]}
      separator={trips.length > 0}
    >
      <DocumentTitle title="Travel History" />
      <Layout>
        <Layout.Section>
          <ManageTripModal
            open={manageTripModalOpen}
            trip={tripToBeEdited}
            onClose={handleCloseManageTripModal}
            onAddNew={handleAddNewTrip}
            onUpdate={handleUpdateTrip}
            onDelete={openConfirmDeleteTripModal}
          />
          <Stack vertical>{renderTrips(trips)}</Stack>
        </Layout.Section>
        <Layout.Section secondary>
          {trips.length > 0 && <UpcomingTripsCard list={upcoming} />}
        </Layout.Section>
      </Layout>
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
      {confirmDeleteActionModal}
    </Page>
  );

  function renderTrips(trips: Trip[]) {
    const byYear = tripsByYear(trips);

    function handleEditTrip(trip: Trip) {
      setTripToBeEdited(trip);
      setManageTripModalOpen(true);
    }

    return Object.keys(byYear)
      .reverse()
      .map((year) => {
        return (
          <div key={year}>
            <Card>
              <ResourceList
                resourceName={{singular: 'trip', plural: 'trips'}}
                items={byYear[year]}
                renderItem={(trip) => (
                  <TripDetails
                    trip={trip}
                    completed={isPastDate(trip.endDate)}
                    key={trip.startDate + trip.location + faker.random.uuid()}
                    onEdit={() => handleEditTrip(trip)}
                  />
                )}
              />
            </Card>
            <div className="Separator">
              <DisplayText size="extraLarge">{year}</DisplayText>
            </div>
          </div>
        );
      });
  }

  function handleCloseManageTripModal() {
    setTripToBeEdited(undefined);
    setManageTripModalOpen(false);
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
            setManageTripModalOpen(false);
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

  function closeConfirmDeleteTripModal() {
    setManageTripModalOpen(true);
    setConfirmDeleteActionModalOpen(false);
  }

  function openConfirmDeleteTripModal() {
    setManageTripModalOpen(false);
    setConfirmDeleteActionModalOpen(true);
  }

  async function handleDeleteTrip(trip: Trip) {
    const docID = trip.id;
    if (tripsCollectionRef) {
      setManageTripLoading(true);
      await tripsCollectionRef
        .doc(docID)
        .delete()
        .then(() => {
          showToast({content: `Trip to ${trip.location} removed`});
        });
      setManageTripLoading(false);
      setManageTripModalOpen(false);
      setConfirmDeleteActionModalOpen(false);
    }
  }
}
