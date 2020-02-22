import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {NotFound} from 'components';
import {Home, Login, TravelHistory} from 'views';

import {ProtectedRoute} from '../ProtectedRoute';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/login" render={() => <Login />} />
      <ProtectedRoute
        path="/travels"
        render={() => <TravelHistory trips={undefined} />}
      />
      <Route render={() => <NotFound />} />
    </Switch>
  );
}
