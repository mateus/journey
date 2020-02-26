import React from 'react';
import {shallow} from 'enzyme';
import {Link} from '@shopify/polaris';

import {Footer} from '../Footer';

describe('<Footer />', () => {
  it('renders <Link /> to Github', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(Link)).toHaveProp({
      url: 'https://github.com/mateus/journey',
      external: true,
    });
  });
});
