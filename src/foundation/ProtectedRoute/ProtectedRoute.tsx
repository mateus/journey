import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect, Route, RouteProps} from 'react-router-dom';

import {auth} from 'utilities/firebase';

export function ProtectedRoute(props: RouteProps) {
  const [user, initialising, error] = useAuthState(auth);

  if (error) {
    throw new Error(error.message);
  }

  if (initialising) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    // eslint-disable-next-line no-console
    console.log(`Hey ${user.displayName}!`);
    return <Route {...props} />;
  }

  return <Redirect to={{pathname: '/', state: {from: props.location}}} />;
}
