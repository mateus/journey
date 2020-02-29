import React from 'react';
import {act} from 'react-dom/test-utils';
import {useCollection} from 'react-firebase-hooks/firestore';
import {EmptyState, Toast, Page} from '@shopify/polaris';
import {ReactWrapper} from 'enzyme';

import {mountWithAppProvider, updateWrapper} from 'utilities/tests';
import {mockTrip, mockTripCollection} from 'utilities/trip';
import {LoadingPage, MemoizedRandomQuote} from 'components';
import {QueryTripCollection} from 'types';

import {TravelHistory} from '../TravelHistory';
import {
  ManageTripCard,
  MemoizedTripDetailsCard,
  UpcomingTripsCard,
} from '../components';

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
      const trips = [
        mockTrip({
          startDate: new Date('01/01/2020'),
          endDate: new Date('01/02/2020'),
        }),
        mockTrip({
          startDate: new Date('01/01/2019'),
          endDate: new Date('01/02/2019'),
        }),
        mockTrip({
          startDate: new Date('01/01/2018'),
          endDate: new Date('01/02/2018'),
        }),
      ];
      const [first, second, third] = trips;
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
      expect(wrapper.find(UpcomingTripsCard)).toHaveProp({
        list: [second, first],
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
            disabled: false,
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

  describe('<ManageTripCard />', () => {
    async function clickAddTrip(wrapper: ReactWrapper) {
      act(() => {
        wrapper.find(Page).prop('primaryAction')!.onAction!();
      });
      await updateWrapper(wrapper);
    }

    it('is closed on first load', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(ManageTripCard)).not.toExist();
    });

    it('renders when clicking "Add trip" action from Page', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      await clickAddTrip(wrapper);
      expect(wrapper.find(ManageTripCard)).toExist();
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

    it.skip('hides the compoent after new trip is added', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      await clickAddTrip(wrapper);
      act(async () => {
        await wrapper.find(ManageTripCard).prop('onAddNew')(mockTrip());
      });
      await updateWrapper(wrapper);
      expect(wrapper.find(ManageTripCard)).not.toExist();
    });

    it.skip('shows <Toast /> with success message after adding new trip', async () => {
      const trip = mockTrip({location: 'Tatooine'});
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      await clickAddTrip(wrapper);
      act(async () => {
        await wrapper.find(ManageTripCard).prop('onAddNew')(mockTrip());
      });
      await updateWrapper(wrapper);
      expect(wrapper.find(Toast)).toHaveProp({
        content: `New trip to ${trip.location} added`,
      });
    });
  });

  describe('<MemoizedTripDetailsCard />', () => {
    it('renders one for each trip', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(MemoizedTripDetailsCard)).toHaveLength(
        mockTrips.length,
      );
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
        wrapper.find(MemoizedTripDetailsCard).map((node) => node.props()),
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
