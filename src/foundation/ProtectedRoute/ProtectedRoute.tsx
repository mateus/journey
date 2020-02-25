import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect, Route, RouteProps} from 'react-router-dom';

import {auth} from 'utilities/firebase';
import {LoadingPage} from 'components';

import {Frame} from '../Frame';

export function ProtectedRoute(props: RouteProps) {
  const [user, initialising, error] = useAuthState(auth);

  if (initialising) {
    return <LoadingPage />;
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

  return <Redirect to={{pathname: '/login', state: {from: props.location}}} />;
}
