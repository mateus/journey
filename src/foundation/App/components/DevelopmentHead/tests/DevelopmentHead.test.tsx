import React from 'react';
import {shallow} from 'enzyme';
import Favicon from 'react-favicon';

import {publicURL} from 'config/variables';

import {DevelopmentHead} from '../DevelopmentHead';

describe('<DevelopmentHead />', () => {
  it('renders Favicon', () => {
    const wrapper = shallow(<DevelopmentHead />);
    expect(wrapper.find(Favicon).props()).toMatchObject({
      url: `${publicURL}/favicons/development/favicon.ico`,
    });
  });

  it('renders Dev Status bar', () => {
    const wrapper = shallow(<DevelopmentHead />);
    expect(wrapper.find('aside').text()).toEqual('development mode');
  });
});
