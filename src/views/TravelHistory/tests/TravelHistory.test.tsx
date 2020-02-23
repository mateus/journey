import React from 'react';
import {act} from 'react-dom/test-utils';
import {Card, Page} from '@shopify/polaris';

import {mountWithAppProvider, updateWrapper} from 'utilities/tests';
import {mockTrip} from 'utilities/trip';
import {Trip} from 'types';

import {sortByStartDateAsc} from '../utilities';
import {TravelHistory, TravelHistoryProps} from '../TravelHistory';
import {
  ManageTripCard,
  TripDetailsCard,
  RandomQuote,
  UpcomingTripsCard,
} from '../components';

import {mockTrips} from './fixtures/mockTrips';

describe('<TravelHistory />', () => {
  const mockProps: TravelHistoryProps = {
    trips: mockTrips,
  };

  it('renders <Page />', async () => {
    const wrapper = await mountWithAppProvider(
      <TravelHistory {...mockProps} />,
    );
    expect(wrapper.find(Page).exists()).toBeTruthy();
    expect(wrapper.find(Page).props()).toMatchObject({
      title: 'Travel History',
    });
  });

  it('renders <RandomQuote />', async () => {
    const wrapper = await mountWithAppProvider(
      <TravelHistory {...mockProps} />,
    );
    expect(
      wrapper
        .find(Card)
        .find(RandomQuote)
        .exists(),
    ).toBeTruthy();
  });

  describe('<UpcomingTripsCard />', () => {
    it('renders list of not completed trips', async () => {
      const wrapper = await mountWithAppProvider(
        <TravelHistory {...mockProps} />,
      );
      const upcoming = mockProps
        .trips!.filter(({completed}) => !completed)
        .sort(sortByStartDateAsc);
      expect(wrapper.find(UpcomingTripsCard).prop('list')).toStrictEqual(
        upcoming,
      );
    });
  });

  describe('<ManageTripCard />', () => {
    it('is closed on first load', async () => {
      const wrapper = await mountWithAppProvider(
        <TravelHistory {...mockProps} />,
      );
      expect(wrapper.find(ManageTripCard).exists()).toBeFalsy();
    });

    it('renders when clicking "Add trip" action from Page', async () => {
      const wrapper = await mountWithAppProvider(
        <TravelHistory {...mockProps} />,
      );
      act(() => {
        wrapper.find(Page).prop('primaryAction')!.onAction!();
      });
      await updateWrapper(wrapper);
      expect(wrapper.find(ManageTripCard).exists()).toBeTruthy();
    });

    it('disables Add trip Page action when showing', async () => {
      const wrapper = await mountWithAppProvider(
        <TravelHistory {...mockProps} />,
      );
      act(() => {
        wrapper.find(Page).prop('primaryAction')!.onAction!();
      });
      await updateWrapper(wrapper);
      expect(wrapper.find(Page).props()).toMatchObject({
        primaryAction: {
          disabled: true,
        },
      });
    });
  });

  describe('<TripDetailsCard />', () => {
    it('renders one for each trip', async () => {
      const wrapper = await mountWithAppProvider(
        <TravelHistory {...mockProps} />,
      );
      expect(wrapper.find(TripDetailsCard)).toHaveLength(mockTrips.length);
    });

    it('renders with the Trip prop set', async () => {
      const [first, second, third] = [
        mockTrip({endDate: new Date('01/01/2019')}),
        mockTrip({endDate: new Date('02/02/2019')}),
        mockTrip({endDate: new Date('01/01/2020')}),
      ];

      const wrapper = await mountWithAppProvider(
        <TravelHistory trips={[first, second, third]} />,
      );
      expect(
        wrapper.find(TripDetailsCard).map((node) => node.props()),
      ).toStrictEqual([third, second, first]);
    });

    it('renders a separator for each group of year', async () => {
      const trips: Trip[] = [
        mockTrip({endDate: new Date('01/01/2020')}),
        mockTrip({endDate: new Date('01/01/2020')}),
        mockTrip({endDate: new Date('01/01/2019')}),
        mockTrip({endDate: new Date('01/01/2019')}),
        mockTrip({endDate: new Date('01/01/2018')}),
      ];
      const wrapper = await mountWithAppProvider(
        <TravelHistory trips={trips} />,
      );
      expect(wrapper.find('.Separator')).toHaveLength(3);
    });
  });
});
