import React from 'react';
import {shallow} from 'enzyme';
import {AppProvider} from '@shopify/polaris';

import {App} from '../App';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders with PolarisProvider', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppProvider)).toBeTruthy();
  });
});
