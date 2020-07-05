import React from 'react';
import {act} from 'react-dom/test-utils';
import {useAuthState} from 'react-firebase-hooks/auth';
import {User} from 'firebase';
import {Navigation, TopBar} from '@shopify/polaris';
import {
  TransportMajorTwotone,
  LogOutMinor,
  GlobeMajorTwotone,
  ChecklistMajorTwotone,
  NoteMajorTwotone,
  GlobeMinor,
} from '@shopify/polaris-icons';

import {mountWithAppProvider, updateWrapper} from 'tests/utilities';
import {auth} from 'utilities/firebase';

import {Frame} from '../Frame';
import {Footer} from '../components';

jest.mock('react-firebase-hooks/auth', () => ({
  ...require.requireActual('react-firebase-hooks/auth'),
  useAuthState: jest.fn(),
}));
const useAuthStateSpy = useAuthState as jest.Mock;

describe('<Frame />', () => {
  const MyComponent = () => {
    return <h1>Component</h1>;
  };

  const mockUser: Partial<User> = {
    displayName: 'Mateus F.',
    photoURL: 'user-image',
  };

  beforeEach(() => {
    useAuthStateSpy.mockReturnValue([mockUser, false, null]);
  });

  afterEach(() => {
    useAuthStateSpy.mockRestore();
  });

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

  describe('<TopBar.UserMenu />', () => {
    it('renders UserMenu', async () => {
      const wrapper = await mountWithAppProvider(
        <Frame>
          <MyComponent />
        </Frame>,
      );
      expect(wrapper.find(TopBar.UserMenu)).toHaveProp({
        actions: [
          {
            items: [
              expect.objectContaining({
                content: 'Google Timeline',
                icon: GlobeMinor,
                url: 'https://www.google.com/maps/timeline',
                external: true,
              }),
              expect.objectContaining({
                content: 'Log out',
                icon: LogOutMinor,
              }),
            ],
          },
        ],
        initials: mockUser.displayName?.charAt(0),
        avatar: mockUser.photoURL,
        name: mockUser.displayName,
      });
    });

    it('logges out the user when clicking Log out', async () => {
      auth.signOut = jest.fn();
      const wrapper = await mountWithAppProvider(
        <Frame>
          <MyComponent />
        </Frame>,
      );
      const topBar = wrapper.find(TopBar.UserMenu);
      act(() => {
        topBar!.prop('actions')[0].items[1].onAction!();
      });
      await updateWrapper(wrapper);
      expect(auth.signOut).toHaveBeenCalled();
    });
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

    it('renders <Navigation.Section /> with all view links', async () => {
      const wrapper = await mountWithAppProvider(
        <Frame>
          <MyComponent />
        </Frame>,
      );
      expect(wrapper.find(Navigation.Section).first()).toHaveProp({
        title: 'Journey',
        items: [
          expect.objectContaining({
            label: 'Travel History',
            icon: TransportMajorTwotone,
          }),
          expect.objectContaining({
            label: 'Wonders of the World',
            icon: GlobeMajorTwotone,
          }),
          expect.objectContaining({
            label: 'Future Plans',
            icon: NoteMajorTwotone,
          }),
          expect.objectContaining({
            label: 'Bucket List',
            icon: ChecklistMajorTwotone,
          }),
        ],
      });
    });
  });
});
