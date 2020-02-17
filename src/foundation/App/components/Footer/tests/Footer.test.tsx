import React from 'react';
import {shallow} from 'enzyme';
import {Image} from '@shopify/polaris';

import {logo192} from 'assets/images';

import {Footer} from '../Footer';

describe('<Footer />', () => {
  it('renders Image with logo', () => {
    const wrapper = shallow(<Footer />);
    expect(
      wrapper.containsMatchingElement(
        <Image source={logo192} alt="Journey app" width={48} />,
      ),
    ).toBeTruthy();
  });
});
