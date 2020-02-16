import React from 'react';
import {Page} from '@shopify/polaris';
import {mountWithPolarisProvider} from 'utilities/tests';

import {TravelHistory} from '../TravelHistory';

describe('<TravelHistory />', () => {
  it('renders <Page />', () => {
    const wrapper = mountWithPolarisProvider(<TravelHistory />);
    expect(wrapper.find(Page).exists()).toBeTruthy();
    expect(wrapper.find(Page).props()).toMatchObject({
      title: 'Travel History',
    });
  });
});
