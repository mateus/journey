import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Login, NotFound, TravelHistory} from 'pages';

import {ProtectedRoute} from '../ProtectedRoute';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <ProtectedRoute path="/" exact render={() => <TravelHistory />} />
      <Route render={() => <NotFound />} />
    </Switch>
  );
}
