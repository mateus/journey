import React from 'react';
import {shallow} from 'enzyme';

import {Frame} from '../Frame';
import {Footer} from '../../Footer';

describe('<Frame />', () => {
  const MyComponent = () => {
    return <h1>Component</h1>;
  };

  it('renders children', () => {
    const wrapper = shallow(
      <Frame>
        <MyComponent />
      </Frame>,
    );
    expect(wrapper.find(MyComponent)).toExist();
  });

  it('renders <Footer />', () => {
    const wrapper = shallow(
      <Frame>
        <MyComponent />
      </Frame>,
    );
    expect(wrapper.find(Footer)).toExist();
  });
});
