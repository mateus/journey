import React from 'react';
import {shallow} from 'enzyme';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect} from 'react-router-dom';
import {User} from 'firebase';

import {Loading} from 'components';

import {Login} from '../Login';

jest.mock('react-firebase-hooks/auth', () => ({
  ...require.requireActual('react-firebase-hooks/auth'),
  useAuthState: jest.fn(),
}));
const useAuthStateSpy = useAuthState as jest.Mock;

describe('<Login />', () => {
  beforeEach(() => {
    useAuthStateSpy.mockReturnValue([{} as User, false, null]);
  });

  afterEach(() => {
    useAuthStateSpy.mockRestore();
  });

  it('renders <Loading /> while auth state is still initializing', () => {
    useAuthStateSpy.mockReturnValue([null, true, null]);
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Loading)).toExist();
    useAuthStateSpy.mockRestore();
  });

  it('redirects to home if authenticated', () => {
    useAuthStateSpy.mockReturnValue([{} as User, false, null]);
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Redirect)).toHaveProp('to', {
      pathname: '/',
    });
    useAuthStateSpy.mockRestore();
  });
});
