import React from 'react';
import {act} from 'react-dom/test-utils';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Card, EmptyState, Page} from '@shopify/polaris';

import {mountWithAppProvider, updateWrapper} from 'utilities/tests';
import {mockTrip, mockTripCollection} from 'utilities/trip';
import {LoadingPage} from 'components';

import {sortByStartDateAsc} from '../utilities';
import {TravelHistory} from '../TravelHistory';
import {
  ManageTripCard,
  TripDetailsCard,
  RandomQuote,
  UpcomingTripsCard,
} from '../components';

import {mockTrips, mockDataTrips} from './fixtures/mockTrips';

jest.mock('react-firebase-hooks/auth', () => ({
  ...require.requireActual('react-firebase-hooks/auth'),
  useAuthState: jest.fn(() => [{uid: 'fake-id'}, false, false]),
}));
jest.mock('react-firebase-hooks/firestore', () => ({
  ...require.requireActual('react-firebase-hooks/firestore'),
  useCollectionData: jest.fn(),
}));
const useCollectionDataSpy = useCollectionData as jest.Mock;

describe('<TravelHistory />', () => {
  beforeEach(() => {
    useCollectionDataSpy.mockReturnValue([mockDataTrips, false, null]);
  });

  afterEach(() => {
    useCollectionDataSpy.mockRestore();
  });

  it('render <LoadingPage /> when collection is still loading', async () => {
    useCollectionDataSpy.mockReturnValue([null, true, null]);
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
    useCollectionDataSpy.mockReturnValue([[], false, null]);
    const wrapper = await mountWithAppProvider(<TravelHistory />);
    expect(wrapper.find(EmptyState)).toExist();
    expect(wrapper.find(EmptyState).find(RandomQuote)).toExist();
  });

  it('renders <RandomQuote />', async () => {
    const wrapper = await mountWithAppProvider(<TravelHistory />);
    expect(wrapper.find(Card).find(RandomQuote)).toExist();
  });

  describe('<UpcomingTripsCard />', () => {
    it('renders list of not completed trips', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      const upcoming = mockTrips
        .filter(({completed}) => !completed)
        .sort(sortByStartDateAsc);
      expect(wrapper.find(UpcomingTripsCard)).toHaveProp({
        list: upcoming,
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
      useCollectionDataSpy.mockReturnValue([[], false, null]);
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
    it('is closed on first load', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(ManageTripCard)).not.toExist();
    });

    it('renders when clicking "Add trip" action from Page', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      act(() => {
        wrapper.find(Page).prop('primaryAction')!.onAction!();
      });
      await updateWrapper(wrapper);
      expect(wrapper.find(ManageTripCard)).toExist();
    });

    it('disables Add trip Page action when showing', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      act(() => {
        wrapper.find(Page).prop('primaryAction')!.onAction!();
      });
      await updateWrapper(wrapper);
      expect(wrapper.find(Page)).toHaveProp({
        primaryAction: expect.objectContaining({
          content: 'Add trip',
          disabled: true,
        }),
      });
    });
  });

  describe('<TripDetailsCard />', () => {
    it('renders one for each trip', async () => {
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find(TripDetailsCard)).toHaveLength(mockTrips.length);
    });

    it.only('renders with the Trip prop set', async () => {
      const [first, second, third] = [
        mockTrip({endDate: new Date('01/01/2019')}),
        mockTrip({endDate: new Date('06/06/2019')}),
        mockTrip({endDate: new Date('01/01/2020')}),
      ];
      useCollectionDataSpy.mockReturnValue([
        [
          mockTripCollection(first),
          mockTripCollection(second),
          mockTripCollection(third),
        ],
        false,
        null,
      ]);
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(
        wrapper.find(TripDetailsCard).map((node) => node.props()),
      ).toStrictEqual([third, second, first]);
    });

    it('renders a separator for each group of year', async () => {
      const trips = [
        mockTripCollection({endDate: new Date('01/01/2020')}),
        mockTripCollection({endDate: new Date('01/01/2020')}),
        mockTripCollection({endDate: new Date('01/01/2019')}),
        mockTripCollection({endDate: new Date('01/01/2019')}),
        mockTripCollection({endDate: new Date('01/01/2018')}),
      ];
      useCollectionDataSpy.mockReturnValue([trips, false, null]);
      const wrapper = await mountWithAppProvider(<TravelHistory />);
      expect(wrapper.find('.Separator')).toHaveLength(3);
    });
  });
});
