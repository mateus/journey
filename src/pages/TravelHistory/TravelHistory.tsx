import React, {useState} from 'react';
import moment from 'moment';
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
import {isFutureDate} from 'utilities/dates';
import {firestore} from 'utilities/firebase';
import {useToast} from 'hooks/useToast';
import {Trip} from 'types';
import {
  ConfirmActionModal,
  DocumentTitle,
  MemoizedRandomQuote,
  SkeletonTwoColumn,
} from 'components';

import {useTrips} from './hooks';
import {tripsByYear, upcomingTrips} from './utilities';
import {
  AnalyticsCard,
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
  const [deleteAllModalOpen, setDeleteAllModalOpen] = useState(false);
  const [deletingAllLoading, setDeletingAllLoading] = useState(false);
  const [manageTripLoading, setManageTripLoading] = useState(false);
  const [importTripsModalOpen, setImportTripsModalOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [Toast, showToast] = useToast();
  const {trips, tripsCollectionRef, loading, error} = useTrips();

  if (error) throw new Error(error.message);
  if (loading) return <SkeletonTwoColumn />;

  const upcoming = upcomingTrips(trips);

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
          // disabled: trips.length === 0,
          disabled: true,
        },
        {
          content: 'Remove all',
          disabled: trips.length === 0,
          icon: DeleteMinor,
          onAction: () => setDeleteAllModalOpen(true),
        },
      ]}
      separator={trips.length > 0}
    >
      <DocumentTitle title="Travel History" />
      {trips.length > 0 && (
        <Layout>
          <Layout.Section>
            <Stack vertical>{renderTrips(trips)}</Stack>
          </Layout.Section>
          <Layout.Section secondary>
            <UpcomingTripsCard list={upcoming} />
            <AnalyticsCard trips={trips} />
          </Layout.Section>
        </Layout>
      )}
      <EmptyState image={EmptyStateAirportDude}>
        <MemoizedRandomQuote />
      </EmptyState>
      <ManageTripModal
        open={manageTripModalOpen}
        trip={tripToBeEdited}
        onClose={handleCloseManageTripModal}
        onAddNew={handleAddNewTrip}
        onUpdate={handleUpdateTrip}
        onDelete={openConfirmDeleteTripModal}
      />
      <ImportTripsModal
        open={importTripsModalOpen}
        loading={importing}
        onClose={() => setImportTripsModalOpen(false)}
        onConfirmed={handleBatchAddTrips}
      />
      <Toast />
      <ConfirmActionModal
        open={deleteAllModalOpen}
        loading={deletingAllLoading}
        title="Remove all trips"
        details="Are you sure you want to remove all your trips?"
        primaryActionLabel="Remove all trips"
        onClose={() => setDeleteAllModalOpen(false)}
        onConfirmed={handleBatchDeleteTrips}
        destructive
      />
      {tripToBeEdited && (
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
      )}
    </Page>
  );

  function renderTrips(trips: Trip[]) {
    const byYear = tripsByYear(trips);

    const handleEditTrip = (trip: Trip) => {
      setTripToBeEdited(trip);
      setManageTripModalOpen(true);
    };

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
                    completed={!isFutureDate(trip.startDate)}
                    key={trip.id}
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

  function closeConfirmDeleteTripModal() {
    setManageTripModalOpen(true);
    setConfirmDeleteActionModalOpen(false);
  }

  function openConfirmDeleteTripModal() {
    setManageTripModalOpen(false);
    setConfirmDeleteActionModalOpen(true);
  }

  async function handleAddNewTrip(trip: Trip, importing = false) {
    // trip.id represents the Document ID, we don't have to include it as a value
    delete trip.id;

    if (tripsCollectionRef) {
      await tripsCollectionRef.add({
        ...trip,
        createdAt: moment().toDate(),
      });

      if (!importing) {
        setManageTripModalOpen(false);
        showToast({content: `Trip to ${trip.location} added`});
      }
    }
  }

  async function handleUpdateTrip(trip: Trip) {
    const docID = trip.id;
    // trip.id represents the Document ID, we don't have to include it as a value
    delete trip.id;

    if (tripsCollectionRef) {
      await tripsCollectionRef.doc(docID).update({
        ...trip,
        updatedAt: moment().toDate(),
      });
      showToast({content: `Trip to ${trip.location} updated`});
    }
  }

  async function handleDeleteTrip(trip: Trip) {
    const docID = trip.id;

    if (tripsCollectionRef) {
      setManageTripLoading(true);
      await tripsCollectionRef.doc(docID).delete();
      setManageTripLoading(false);
      setManageTripModalOpen(false);
      setConfirmDeleteActionModalOpen(false);
      showToast({content: `Trip to ${trip.location} removed`});
    }
  }

  async function handleBatchAddTrips(tripsToImport: Trip[]) {
    setImporting(true);

    if (tripsCollectionRef) {
      const batch = firestore.batch();

      tripsToImport.forEach((trip) => {
        const docRef = tripsCollectionRef.doc();
        batch.set(docRef, {
          ...trip,
          createdAt: moment().toDate(),
        });
      });

      await batch.commit();
      showToast({content: `${tripsToImport.length} trips imported`});
    }

    setImporting(false);
    setImportTripsModalOpen(false);
  }

  async function handleBatchDeleteTrips() {
    setDeletingAllLoading(true);

    if (tripsCollectionRef) {
      const batch = firestore.batch();

      trips.forEach(({id}) => {
        const docRef = tripsCollectionRef.doc(id);
        batch.delete(docRef);
      });

      await batch.commit();
      showToast({content: 'All trips removed'});
    }

    setDeletingAllLoading(false);
    setDeleteAllModalOpen(false);
  }
}
