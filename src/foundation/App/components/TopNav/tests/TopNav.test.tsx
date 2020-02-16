import React from 'react';
import {shallow} from 'enzyme';
import {Image} from '@shopify/polaris';
import {logo192} from 'assets/images';

import {TopNav} from '../TopNav';

describe('<TopNav />', () => {
  it('renders Image with logo', () => {
    const wrapper = shallow(<TopNav />);
    expect(wrapper.find(Image).prop('source')).toEqual(logo192);
  });
});
