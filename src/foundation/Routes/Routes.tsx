import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {
  BucketList,
  FuturePlans,
  Login,
  NotFound,
  TravelHistory,
  WondersOfTheWorld,
} from 'pages';

import {ProtectedRoute} from '../ProtectedRoute';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <ProtectedRoute path="/" exact render={() => <TravelHistory />} />
      <ProtectedRoute path="/plans" exact render={() => <FuturePlans />} />
      <ProtectedRoute
        path="/wonders"
        exact
        render={() => <WondersOfTheWorld />}
      />
      <ProtectedRoute path="/bucket-list" exact render={() => <BucketList />} />
      <Route render={() => <NotFound />} />
    </Switch>
  );
}
