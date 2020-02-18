import React from 'react';
import {Card, Page} from '@shopify/polaris';
import {act} from 'react-dom/test-utils';

import {mountWithPolarisProvider} from 'utilities/tests';
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

  it('renders <Page />', () => {
    const wrapper = mountWithPolarisProvider(<TravelHistory {...mockProps} />);
    expect(wrapper.find(Page).exists()).toBeTruthy();
    expect(wrapper.find(Page).props()).toMatchObject({
      title: 'Travel History',
    });
  });

  it('renders <RandomQuote />', () => {
    const wrapper = mountWithPolarisProvider(<TravelHistory {...mockProps} />);
    expect(
      wrapper
        .find(Card)
        .find(RandomQuote)
        .exists(),
    ).toBeTruthy();
  });

  describe('<UpcomingTripsCard />', () => {
    it('renders list of not completed trips', () => {
      const wrapper = mountWithPolarisProvider(
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
    it('is closed on first load', () => {
      const wrapper = mountWithPolarisProvider(
        <TravelHistory {...mockProps} />,
      );
      expect(wrapper.find(ManageTripCard).exists()).toBeFalsy();
    });

    it('renders when clicking "Add trip" action from Page', async () => {
      const wrapper = mountWithPolarisProvider(
        <TravelHistory {...mockProps} />,
      );
      await act(async () => {
        await wrapper.find(Page)!.prop('primaryAction')!.onAction!();
        wrapper.update();
      });
      expect(wrapper.find(ManageTripCard).exists()).toBeTruthy();
    });

    it('disables Add trip Page action when showing', async () => {
      const wrapper = mountWithPolarisProvider(
        <TravelHistory {...mockProps} />,
      );
      await act(async () => {
        await wrapper.find(Page)!.prop('primaryAction')!.onAction!();
        wrapper.update();
      });
      expect(wrapper.find(Page).props()).toMatchObject({
        primaryAction: {
          disabled: true,
        },
      });
    });
  });

  describe('<TripDetailsCard />', () => {
    it('renders one for each trip', () => {
      const wrapper = mountWithPolarisProvider(
        <TravelHistory {...mockProps} />,
      );
      expect(wrapper.find(TripDetailsCard)).toHaveLength(mockTrips.length);
    });

    it('renders with the Trip prop set', () => {
      const [first, second, third] = [
        mockTrip({endDate: new Date('01/01/2019')}),
        mockTrip({endDate: new Date('02/02/2019')}),
        mockTrip({endDate: new Date('01/01/2020')}),
      ];

      const wrapper = mountWithPolarisProvider(
        <TravelHistory trips={[first, second, third]} />,
      );
      expect(
        wrapper.find(TripDetailsCard).map((node) => node.props()),
      ).toStrictEqual([third, second, first]);
    });

    it('renders a separator for each group of year', () => {
      const trips: Trip[] = [
        mockTrip({endDate: new Date('01/01/2020')}),
        mockTrip({endDate: new Date('01/01/2020')}),
        mockTrip({endDate: new Date('01/01/2019')}),
        mockTrip({endDate: new Date('01/01/2019')}),
        mockTrip({endDate: new Date('01/01/2018')}),
      ];
      const wrapper = mountWithPolarisProvider(<TravelHistory trips={trips} />);
      expect(wrapper.find('.Separator')).toHaveLength(3);
    });
  });
});
