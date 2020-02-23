import React from 'react';
import {Navigation} from '@shopify/polaris';
import {
  TransportMajorTwotone,
  LogOutMinor,
  GlobeMajorTwotone,
  ChecklistMajorTwotone,
  NoteMajorTwotone,
} from '@shopify/polaris-icons';

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
          {
            url: '/',
            label: 'Travel History',
            icon: TransportMajorTwotone,
          },
          {
            url: '/plans',
            disabled: true,
            label: 'Future Plans',
            icon: NoteMajorTwotone,
          },
          {
            url: '/wonders',
            disabled: true,
            label: 'Wonders of the World',
            icon: GlobeMajorTwotone,
          },
          {
            url: '/bucket-list',
            disabled: true,
            label: 'Bucket List',
            icon: ChecklistMajorTwotone,
          },
        ],
      });
    });

    it('renders <Navigation.Section /> with log out link', async () => {
      const wrapper = await mountWithAppProvider(
        <Frame>
          <MyComponent />
        </Frame>,
      );
      expect(wrapper.find(Navigation.Section).last()).toHaveProp({
        items: [
          expect.objectContaining({
            label: 'Log out',
            icon: LogOutMinor,
          }),
        ],
      });
    });
  });
});
