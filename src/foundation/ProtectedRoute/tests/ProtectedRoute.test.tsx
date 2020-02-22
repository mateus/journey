import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {
  mountWithAppContext,
  mockFirebase,
  mockUser,
} from 'foundation/test-utilities';

import ProtectedRoute from '../ProtectedRoute';

const mockProps: RouteProps = {
  path: '/my-route',
  location: {
    pathname: '/my-route',
    search: '',
    state: '',
    hash: '',
  },
  render: () => <></>,
};

describe('<ProtectedRoute />', () => {
  it.skip('redirects to homepage if not authenticated', async () => {
    const wrapper = await mountWithAppContext(
      <ProtectedRoute {...mockProps} />,
      {
        firebaseSdk: await mockFirebase({isAuthenticated: false}),
      },
    );
    console.log(wrapper.debug());
    const redirect = wrapper.find(Redirect);

    expect(redirect).toExist();
    expect(redirect).toHaveProp('to', {
      pathname: '/',
      state: {from: mockProps.location},
    });
  });

  it('renders route if authenticated', async () => {
    const wrapper = await mountWithAppContext(
      <ProtectedRoute {...mockProps} />,
      {
        firebaseSdk: await mockFirebase({isAuthenticated: true}),
      },
    );
    const route = wrapper
      .find(Route)
      .filterWhere((route) => route.prop('path') === mockProps.path);

    expect(route).toExist();
    expect(route.props()).toMatchObject(mockProps);
  });
});
