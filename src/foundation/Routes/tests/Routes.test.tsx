import React from 'react';
import {mount} from 'enzyme';
import {useAuthState} from 'react-firebase-hooks/auth';
import {MemoryRouter} from 'react-router-dom';
import {User} from 'firebase';

import {
  BucketList,
  FuturePlans,
  Login,
  NotFound,
  TravelHistory,
  WondersOfTheWorld,
} from 'pages';

import {Routes} from '../Routes';

jest.mock('foundation', () => ({
  Frame({children}: {children: React.ReactNode}) {
    return <>{children}</>;
  },
}));

jest.mock('react-firebase-hooks/auth', () => ({
  ...require.requireActual('react-firebase-hooks/auth'),
  useAuthState: jest.fn(),
}));
const useAuthStateSpy = useAuthState as jest.Mock;

jest.mock('pages', () => ({
  BucketList: () => null,
  FuturePlans: () => null,
  Login: () => null,
  NotFound: () => null,
  TravelHistory: () => null,
  WondersOfTheWorld: () => null,
}));

describe('<Routes />', () => {
  beforeEach(() => {
    useAuthStateSpy.mockReturnValue([{} as User, false, null]);
  });

  afterEach(() => {
    useAuthStateSpy.mockRestore();
  });

  function createWrapper(component: JSX.Element, path: string) {
    return mount(
      <MemoryRouter initialEntries={[path]} initialIndex={0}>
        {component}
      </MemoryRouter>,
    );
  }

  describe('/', () => {
    it('renders TravelHistory', () => {
      const wrapper = createWrapper(<Routes />, '/');
      expect(wrapper.find(TravelHistory)).toExist();
    });
  });

  describe('/login', () => {
    it('renders Login', () => {
      const wrapper = createWrapper(<Routes />, '/login');
      expect(wrapper.find(Login)).toExist();
    });
  });

  describe('/plans', () => {
    it('renders FuturePlans', () => {
      const wrapper = createWrapper(<Routes />, '/plans');
      expect(wrapper.find(FuturePlans)).toExist();
    });
  });

  describe('/wonders', () => {
    it('renders WondersOfTheWorld', () => {
      const wrapper = createWrapper(<Routes />, '/wonders');
      expect(wrapper.find(WondersOfTheWorld)).toExist();
    });
  });

  describe('/bucket-list', () => {
    it('renders BucketList', () => {
      const wrapper = createWrapper(<Routes />, '/bucket-list');
      expect(wrapper.find(BucketList)).toExist();
    });
  });

  describe('Not found routes', () => {
    it('renders NotFound', () => {
      const wrapper = createWrapper(<Routes />, '/invalid-route');
      expect(wrapper.find(NotFound)).toExist();
    });
  });
});
