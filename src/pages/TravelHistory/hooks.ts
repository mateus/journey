import {useEffect, useState} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import moment from 'moment';
import firebase from 'firebase';

import {Trip, QueryTripCollection} from 'types';
import {auth, firestore} from 'utilities/firebase';

interface TripsData {
  trips: Trip[];
  loading: boolean;
  error?: Error;
  tripsCollectionRef: firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
  > | null;
}

export function useTrips(): TripsData {
  const [user] = useAuthState(auth);
  const tripsCollectionRef = user
    ? firestore
        .collection('users')
        .doc(user?.uid)
        .collection('trips')
    : null;
  const [tripsSnapshot, loading, error] = useCollection(tripsCollectionRef);

  const tripsData =
    tripsSnapshot?.docs.map<QueryTripCollection>((doc) => {
      return {
        id: doc.id,
        // data() does not have inferred types from firestore
        ...(doc.data() as QueryTripCollection),
      };
    }) || [];
  const reconciledTrips = tripsData.map<Trip>(
    ({endDate, startDate, ...rest}) => {
      return {
        ...rest,
        endDate: moment.unix(endDate.seconds).toDate(),
        startDate: moment.unix(startDate.seconds).toDate(),
      };
    },
  );

  return {trips: reconciledTrips, tripsCollectionRef, loading, error};
}
