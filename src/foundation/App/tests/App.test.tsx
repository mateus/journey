import React from 'react';
import {shallow} from 'enzyme';
import {AppProvider} from '@shopify/polaris';

import {DevelopmentHead} from '../components';
import {App} from '../App';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders with PolarisProvider', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppProvider)).toBeTruthy();
  });

  // Always returning true. Jest is running in development mode by default.
  it('renders with DevelopmentHead when in development mode', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(DevelopmentHead)).toBeTruthy();
  });
});
