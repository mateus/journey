import React from 'react';
import {Card, Page} from '@shopify/polaris';
import {act} from 'react-dom/test-utils';

import {mountWithPolarisProvider} from 'utilities/tests';

import {TravelHistory, TravelHistoryProps} from '../TravelHistory';
import {ManageTripCard, RandomQuote, UpcomingTripsCard} from '../components';

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

  it('renders <UpcomingTripsCard />', () => {
    const wrapper = mountWithPolarisProvider(<TravelHistory {...mockProps} />);
    expect(wrapper.find(UpcomingTripsCard).exists()).toBeTruthy();
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
});
