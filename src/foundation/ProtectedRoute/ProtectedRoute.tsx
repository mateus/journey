import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect, Route, RouteProps} from 'react-router-dom';

import {auth} from 'utilities/firebase';
import {Loading} from 'components';

import {Frame} from '../Frame';

export function ProtectedRoute(props: RouteProps) {
  const [user, initialising, error] = useAuthState(auth);

  if (initialising) {
    return <Loading />;
  }

  if (error) {
    throw new Error(error.message);
  }

  if (user) {
    return (
      <Frame>
        <Route {...props} />
      </Frame>
    );
  }

  return <Redirect to={{pathname: '/', state: {from: props.location}}} />;
}
