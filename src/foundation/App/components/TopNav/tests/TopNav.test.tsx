import React from 'react';
import {shallow} from 'enzyme';
import {Image} from '@shopify/polaris';
import {logo192} from 'assets/images';

import {TopNav} from '../TopNav';

describe('<TopNav />', () => {
  it('renders Image with logo', () => {
    const wrapper = shallow(<TopNav />);
    expect(
      wrapper.containsMatchingElement(
        <Image source={logo192} alt="Journey app" width={48} />,
      ),
    ).toBeTruthy();
  });
});
