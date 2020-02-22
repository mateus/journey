import React from 'react';
import {shallow} from 'enzyme';

import {Frame} from '../Frame';
import {TopNav} from '../../TopNav';
import {Footer} from '../../Footer';

describe('<Frame />', () => {
  const MyComponent = () => {
    return <h1>Component</h1>;
  };

  it('renders <TopNav />', () => {
    const wrapper = shallow(
      <Frame>
        <MyComponent />
      </Frame>,
    );
    expect(wrapper.find(TopNav)).toExist();
  });

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
