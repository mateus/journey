import React from 'react';
import {act} from 'react-dom/test-utils';
import {useCollection} from 'react-firebase-hooks/firestore';
import {ReactWrapper} from 'enzyme';
import moment from 'moment';
import {EmptyState, Toast, Page, ComplexAction} from '@shopify/polaris';

import {mountWithAppProvider, updateWrapper} from 'tests/utilities';
import {mockTrip, mockTripCollection} from 'utilities/trip';
import {LoadingPage, MemoizedRandomQuote} from 'components';
import {QueryTripCollection} from 'types';

import {TravelHistory} from '../TravelHistory';
import {ManageTripModal, TripDetails, UpcomingTripsCard} from '../components';

import {mockTrips, mockDataTrips} from './fixtures/mockTrips';

jest.mock('react-firebase-hooks/auth', () => ({
  ...require.requireActual('react-firebase-hooks/auth'),
  useAuthState: jest.fn(() => [{uid: 'fake-id'}, false, false]),
}));
jest.mock('react-firebase-hooks/firestore', () => ({
  ...require.requireActual('react-firebase-hooks/firestore'),
  useCollection: jest.fn(),
}));

const useCollectionSpy = useCollection as jest.Mock;

describe('<TravelHistory />', () => {
  beforeEach(() => {
    useCollectionSpy.mockReturnValue([
      createCollectionsSnapshot(mockDataTrips),
      false,
      null,
    ]);
  });

  afterEach(() => {
    useCollectionSpy.mockRestore();
  });

  it('render <LoadingPage /> when collection is still loading', async () => {
    useCollectionSpy.mockReturnValue([null, true, null]);
    const wrapper = await mountWithAppProvider(<TravelHistory />);
    expect(wrapper.find(LoadingPage)).toExist();
  });

  it('renders <Page />', async () => {
    const wrapper = await mountWithAppProvider(<TravelHistory />);
    expect(wrapper.find(Page)).toHaveProp({
      title: 'Travel History',
    });
  });

  it('renders <EmptySate /> if list of trips is empty', async () => {
    useCollectionSpy.mockReturnValue([
      createCollectionsSnapshot([]),
      false,
      null,
    ]);
    const wrapper = await mountWithAppProvider(<TravelHistory />);
    expect(wrapper.find(EmptyState)).toExist();
    expect(wrapper.find(EmptyState).find(MemoizedRandomQuote)).toExist();
  });

  describe('<UpcomingTripsCard />', () => {
    it('does not render if there are no trips', async () => {
      useCollectionSpy.mockReturnValue([
        createCollectionsSnapshot([]),
        false,
        null,
      ]);
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(UpcomingTripsCard)).not.toExist();
    });

    it('renders ordered list of upcoming trips', async () => {
      const todayDate = new Date();
      const pastDate = moment(todayDate)
        .subtract(1, 'days')
        .toDate();
      const futureDate = moment(todayDate)
        .add(1, 'days')
        .toDate();
      const pastTrip = mockTrip({
        startDate: pastDate,
        endDate: pastDate,
      });
      const todayTrip = mockTrip({
        startDate: pastDate,
        endDate: todayDate,
      });
      const futureTrip = mockTrip({
        startDate: pastDate,
        endDate: futureDate,
      });
      useCollectionSpy.mockReturnValue([
        createCollectionsSnapshot([
          mockTripCollection(futureTrip),
          mockTripCollection(todayTrip),
          mockTripCollection(pastTrip),
        ]),
        false,
        null,
      ]);
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(UpcomingTripsCard)).toHaveProp({
        list: [
          expect.objectContaining({id: todayTrip.id}),
          expect.objectContaining({id: futureTrip.id}),
        ],
      });
    });
  });

  describe('Export trips', () => {
    it('renders as <Page /> a action', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(Page)).toHaveProp({
        secondaryActions: expect.arrayContaining([
          expect.objectContaining({
            content: 'Export',
            disabled: true,
          }),
        ]),
      });
    });

    it('is disabled if there are no trips', async () => {
      useCollectionSpy.mockReturnValue([
        createCollectionsSnapshot([]),
        false,
        null,
      ]);
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(Page)).toHaveProp({
        secondaryActions: expect.arrayContaining([
          expect.objectContaining({
            content: 'Export',
            disabled: true,
          }),
        ]),
      });
    });
  });

  describe('Import trips', () => {
    it('renders as <Page /> a action', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(Page)).toHaveProp({
        secondaryActions: expect.arrayContaining([
          expect.objectContaining({
            content: 'Import',
          }),
        ]),
      });
    });
  });

  describe('<ManageTripModal />', () => {
    async function clickAddTrip(wrapper: ReactWrapper) {
      act(() => {
        const primaryActionProp = wrapper
          .find(Page)
          .prop('primaryAction') as ComplexAction;
        primaryActionProp.onAction!();
      });
      await updateWrapper(wrapper);
    }

    it('is closed on first load', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(ManageTripModal)).not.toExist();
    });

    it('renders when clicking "Add trip" action from Page', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      await clickAddTrip(wrapper);
      expect(wrapper.find(ManageTripModal)).toExist();
      expect(wrapper.find(ManageTripModal)).toHaveProp({open: true});
    });

    it('disables Add trip Page action when showing', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      await clickAddTrip(wrapper);
      expect(wrapper.find(Page)).toHaveProp({
        primaryAction: expect.objectContaining({
          content: 'Add trip',
          disabled: true,
        }),
      });
    });

    it.todo('triggers firestore add action with a new trip');

    it.skip('closes after new trip is added', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      await clickAddTrip(wrapper);
      act(async () => {
        await wrapper.find(ManageTripModal).prop('onAddNew')(mockTrip());
      });
      await updateWrapper(wrapper);
      expect(wrapper.find(ManageTripModal)).toHaveProp({open: false});
    });

    it.skip('shows <Toast /> with success message after adding new trip', async () => {
      const trip = mockTrip({location: 'Tatooine'});
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      await clickAddTrip(wrapper);
      act(async () => {
        await wrapper.find(ManageTripModal).prop('onAddNew')(mockTrip());
      });
      await updateWrapper(wrapper);
      expect(wrapper.find(Toast)).toHaveProp({
        content: `New trip to ${trip.location} added`,
      });
    });
  });

  describe('<TripDetails />', () => {
    it('renders one for each trip', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(TripDetails)).toHaveLength(mockTrips.length);
    });

    it('renders descending ordered list of trips', async () => {
      const [first, second, third] = [
        mockTrip({
          endDate: new Date('01/01/2019'),
          startDate: new Date('01/2/2019'),
        }),
        mockTrip({
          endDate: new Date('06/06/2019'),
          startDate: new Date('06/07/2019'),
        }),
        mockTrip({
          endDate: new Date('12/12/2019'),
          startDate: new Date('12/13/2019'),
        }),
      ];
      useCollectionSpy.mockReturnValue([
        createCollectionsSnapshot([
          mockTripCollection(first),
          mockTripCollection(second),
          mockTripCollection(third),
        ]),
        false,
        null,
      ]);
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(
        wrapper.find(TripDetails).map((node) => node.prop('trip')),
      ).toStrictEqual([
        expect.objectContaining(third),
        expect.objectContaining(second),
        expect.objectContaining(first),
      ]);
    });

    it('renders a separator for each group of year', async () => {
      const trips = [
        mockTripCollection({endDate: new Date('01/01/2020')}),
        mockTripCollection({endDate: new Date('01/01/2020')}),
        mockTripCollection({endDate: new Date('01/01/2019')}),
        mockTripCollection({endDate: new Date('01/01/2019')}),
        mockTripCollection({endDate: new Date('01/01/2018')}),
      ];
      useCollectionSpy.mockReturnValue([
        createCollectionsSnapshot(trips),
        false,
        null,
      ]);
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find('.Separator')).toHaveLength(3);
    });

    it.todo('triggers firestore update action with a new trip');

    it.todo('triggers firestore delete action with a new trip');

    it.todo('shows <Toast /> with success message after updating trip');

    it.todo('shows <Toast /> with success message after deleting new trip');
  });
});

// Mimics Firestore data snapshots
function createCollectionsSnapshot(dataTrips: QueryTripCollection[]) {
  const docs = dataTrips.map((trip) => {
    return {
      id: trip.id,
      data: () => trip,
    };
  });
  return {docs};
}
