import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {NotFound} from 'components';
import {Login, TravelHistory} from 'views';

import {ProtectedRoute} from '../ProtectedRoute';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <ProtectedRoute
        path="/"
        exact
        render={() => <TravelHistory trips={[]} />}
      />
      <Route render={() => <NotFound />} />
    </Switch>
  );
}
