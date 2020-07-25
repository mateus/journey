import React from 'react';
import {act} from 'react-dom/test-utils';
import {useCollection} from 'react-firebase-hooks/firestore';
import {ReactWrapper} from 'enzyme';
import moment from 'moment';
import {EmptyState, Toast, Page, ComplexAction} from '@shopify/polaris';

import {mountWithAppProvider, updateWrapper} from 'tests/utilities';
import {mockTrip, mockTripCollection} from 'utilities/trip';
import {
  SkeletonTwoColumn,
  MemoizedRandomQuote,
  ConfirmActionModal,
} from 'components';
import {QueryTripCollection} from 'types';

import {TravelHistory} from '../TravelHistory';
import {
  ManageTripModal,
  TripDetails,
  ImportTripsModal,
  UpcomingTripsCard,
  AnalyticsCard,
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

  it('render <SkeletonTwoColumn /> when collection is still loading', async () => {
    useCollectionSpy.mockReturnValue([null, true, null]);
    const wrapper = await mountWithAppProvider(<TravelHistory />);
    expect(wrapper.find(SkeletonTwoColumn)).toExist();
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

  describe('<AnalyticsCard />', () => {
    it('does not render if there are no trips', async () => {
      useCollectionSpy.mockReturnValue([
        createCollectionsSnapshot([]),
        false,
        null,
      ]);
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(AnalyticsCard)).not.toExist();
    });

    it('renders with trips', async () => {
      const trips = [
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
      expect(wrapper.find(AnalyticsCard)).toHaveProp({
        trips,
      });
    });
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
      const todayDate = moment()
        .startOf('day')
        .toDate();
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
        startDate: todayDate,
        endDate: todayDate,
      });
      const futureTrip = mockTrip({
        startDate: futureDate,
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
        list: [expect.objectContaining({id: futureTrip.id})],
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
    it('renders as <Page /> an action', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(Page)).toHaveProp({
        secondaryActions: expect.arrayContaining([
          expect.objectContaining({
            content: 'Import',
          }),
        ]),
      });
    });

    it('opens a <ImportTripsModal /> when action is triggered', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      const action = wrapper
        .find(Page)
        .prop('secondaryActions')!
        .find(({content}) => content === 'Import')!;
      act(() => {
        action.onAction!();
      });
      await updateWrapper(wrapper);
      expect(wrapper.find(ImportTripsModal)).toHaveProp({
        open: true,
      });
    });

    it.todo(
      'imports trips in batch when <ImportTripsModal /> onSuccess is triggered',
    );
  });

  describe('Remove all trips', () => {
    it('renders as <Page /> an action', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(Page)).toHaveProp({
        secondaryActions: expect.arrayContaining([
          expect.objectContaining({
            content: 'Remove all',
            disabled: false,
          }),
        ]),
      });
    });

    it('has action disabled if there are no trips', async () => {
      useCollectionSpy.mockReturnValue([
        createCollectionsSnapshot([]),
        false,
        null,
      ]);
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(Page)).toHaveProp({
        secondaryActions: expect.arrayContaining([
          expect.objectContaining({
            content: 'Remove all',
            disabled: true,
          }),
        ]),
      });
    });

    it('opens a <ConfirmActionModal /> when action is triggered', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      const action = wrapper
        .find(Page)
        .prop('secondaryActions')!
        .find(({content}) => content === 'Remove all')!;
      act(() => {
        action.onAction!();
      });
      await updateWrapper(wrapper);
      expect(wrapper.find(ConfirmActionModal)).toHaveProp({
        open: true,
      });
    });

    it.todo(
      'removes all trips in batch when <ConfirmActionModal /> onSuccess is triggered',
    );
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
      expect(wrapper.find(ManageTripModal)).toHaveProp({open: false});
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

    it('renders with completed prop set to false if trip is in the future', async () => {
      const today = moment().startOf('day');
      const futureDate = moment(today)
        .add(1, 'days')
        .toDate();
      const trips = [mockTripCollection({startDate: futureDate})];
      useCollectionSpy.mockReturnValue([
        createCollectionsSnapshot(trips),
        false,
        null,
      ]);
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(TripDetails)).toHaveProp({
        completed: false,
      });
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
