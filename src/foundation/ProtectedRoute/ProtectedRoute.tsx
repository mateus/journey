import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

import {useAppContext} from 'hooks/useAppContext';

export function ProtectedRoute(props: RouteProps) {
  const {
    app: {user},
  } = useAppContext();

  if (user) {
    return <Route {...props} />;
  }

  alert(`${user} is not logged in`);

  return <Redirect to={{pathname: '/login', state: {from: props.location}}} />;
}
