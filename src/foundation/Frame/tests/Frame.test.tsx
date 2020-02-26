import React from 'react';
import {act} from 'react-dom/test-utils';
import {Navigation} from '@shopify/polaris';
import {
  TransportMajorTwotone,
  LogOutMinor,
  GlobeMajorTwotone,
  ChecklistMajorTwotone,
  NoteMajorTwotone,
} from '@shopify/polaris-icons';

import {mountWithAppProvider} from 'utilities/tests';
import {auth} from 'utilities/firebase';

import {Frame} from '../Frame';
import {TopNav, Footer} from '../components';

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

    it('renders <TopNav />', async () => {
      const wrapper = await mountWithAppProvider(
        <Frame>
          <MyComponent />
        </Frame>,
      );
      expect(wrapper.find(Navigation).find(TopNav)).toExist();
    });

    it('renders <Navigation.Section /> with all view links', async () => {
      const wrapper = await mountWithAppProvider(
        <Frame>
          <MyComponent />
        </Frame>,
      );
      expect(wrapper.find(Navigation.Section).first()).toHaveProp({
        title: 'Journey App',
        items: [
          expect.objectContaining({
            label: 'Travel History',
            icon: TransportMajorTwotone,
          }),
          expect.objectContaining({
            label: 'Future Plans',
            icon: NoteMajorTwotone,
          }),
          expect.objectContaining({
            label: 'Wonders of the World',
            icon: GlobeMajorTwotone,
          }),
          expect.objectContaining({
            label: 'Bucket List',
            icon: ChecklistMajorTwotone,
          }),
        ],
      });
    });

    it('renders <Navigation.Section /> with log out link', async () => {
      const wrapper = await mountWithAppProvider(
        <Frame>
          <MyComponent />
        </Frame>,
      );
      const lastNavSection = wrapper.find(Navigation.Section).last();
      expect(lastNavSection).toHaveProp({
        items: [
          expect.objectContaining({
            label: 'Log out',
            icon: LogOutMinor,
          }),
        ],
      });
    });

    it('logges out the user when clicking Log out', async () => {
      auth.signOut = jest.fn();
      const wrapper = await mountWithAppProvider(
        <Frame>
          <MyComponent />
        </Frame>,
      );
      const lastNavSection = wrapper.find(Navigation.Section).last();
      act(() => {
        lastNavSection!.prop('items')[0].onClick!();
      });
      expect(auth.signOut).toHaveBeenCalled();
    });
  });
});
