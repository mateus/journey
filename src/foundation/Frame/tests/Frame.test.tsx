import React from 'react';
import {Navigation} from '@shopify/polaris';

import {mountWithAppProvider} from 'utilities/tests';

import {Frame} from '../Frame';
import {TopNav} from '../../TopNav';
import {Footer} from '../../Footer';

describe('<Frame />', () => {
  const MyComponent = () => {
    return <h1>Component</h1>;
  };

  it('renders children', async () => {
    const wrapper = await mountWithAppProvider(
      <Frame>
        <MyComponent />
      </Frame>,
    );
    expect(wrapper.find(MyComponent)).toExist();
  });

  it('renders <TopNav />', async () => {
    const wrapper = await mountWithAppProvider(
      <Frame>
        <MyComponent />
      </Frame>,
    );
    expect(wrapper.find(TopNav)).toExist();
  });

  it('renders <Footer />', async () => {
    const wrapper = await mountWithAppProvider(
      <Frame>
        <MyComponent />
      </Frame>,
    );
    expect(wrapper.find(Footer)).toExist();
  });

  describe('<Navigation />', () => {
    it('renders with location set', async () => {
      const wrapper = await mountWithAppProvider(
        <Frame>
          <MyComponent />
        </Frame>,
      );
      expect(wrapper.find(Navigation)).toHaveProp({location: '/'});
    });
  });
});
