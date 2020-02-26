import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect, Route, RouteProps} from 'react-router-dom';

import {auth} from 'utilities/firebase';
import {LoadingPage} from 'components';

export function ProtectedRoute(props: RouteProps) {
  const [user, initialising, error] = useAuthState(auth);

  if (initialising) {
    return <LoadingPage />;
  }

  if (error) {
    throw new Error(error.message);
  }

  if (user) {
    return <Route {...props} />;
  }

  return <Redirect to={{pathname: '/login', state: {from: props.location}}} />;
}
