import React from 'react';
import {shallow} from 'enzyme';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect, RouteProps} from 'react-router-dom';
import {User} from 'firebase';

import {LoadingPage} from 'components';
import {Frame} from 'foundation';

import {ProtectedRoute} from '../ProtectedRoute';

jest.mock('react-firebase-hooks/auth', () => ({
  ...require.requireActual('react-firebase-hooks/auth'),
  useAuthState: jest.fn(),
}));
const useAuthStateSpy = useAuthState as jest.Mock;

describe('<ProtectedRoute />', () => {
  const mockProps: RouteProps = {
    path: '/my-route',
    location: {
      pathname: '/my-route',
      search: '',
      state: '',
      hash: '',
    },
    render: jest.fn(),
  };

  beforeEach(() => {
    useAuthStateSpy.mockReturnValue([{} as User, false, null]);
  });

  afterEach(() => {
    useAuthStateSpy.mockRestore();
  });

  it('renders <LoadingPage /> while auth state is still initializing', () => {
    useAuthStateSpy.mockReturnValue([null, true, null]);
    const wrapper = shallow(<ProtectedRoute {...mockProps} />);
    expect(wrapper.find(LoadingPage)).toExist();
    useAuthStateSpy.mockRestore();
  });

  it('redirects to home if not authenticated', () => {
    useAuthStateSpy.mockReturnValue([null, false, null]);
    const wrapper = shallow(<ProtectedRoute {...mockProps} />);
    expect(wrapper.find(Redirect)).toHaveProp('to', {
      pathname: '/login',
      state: {from: mockProps.location},
    });
    useAuthStateSpy.mockRestore();
  });

  it('renders <Frame />', () => {
    const wrapper = shallow(<ProtectedRoute {...mockProps} />);
    expect(wrapper.find(Frame)).toExist();
  });
});
