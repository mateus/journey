import React from 'react';
import {Page} from '@shopify/polaris';
import {act} from 'react-dom/test-utils';

import {mountWithPolarisProvider} from 'utilities/tests';

import {TravelHistory} from '../TravelHistory';
import {ManageTripCard} from '../components';

import {mockTrips} from './fixtures/mockTrips';

describe('<TravelHistory />', () => {
  it('renders <Page />', () => {
    const wrapper = mountWithPolarisProvider(<TravelHistory />);
    expect(wrapper.find(Page).exists()).toBeTruthy();
    expect(wrapper.find(Page).props()).toMatchObject({
      title: 'Travel History',
    });
  });

  describe('<ManageTripCard />', () => {
    it('is closed on first load', () => {
      const wrapper = mountWithPolarisProvider(<TravelHistory />);
      expect(wrapper.find(ManageTripCard).exists()).toBeFalsy();
    });

    it('renders when clicking "Add trip" action from Page', async () => {
      const wrapper = mountWithPolarisProvider(<TravelHistory />);
      await act(async () => {
        await wrapper.find(Page)!.prop('primaryAction')!.onAction!();
        wrapper.update();
      });
      expect(wrapper.find(ManageTripCard).exists()).toBeTruthy();
    });
  });
});
