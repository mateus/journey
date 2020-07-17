import {useCollection} from 'react-firebase-hooks/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import moment from 'moment';

import {auth, firestore} from 'utilities/firebase';

type WondersFormValues = Record<string, Record<string, boolean>>;

export interface WondersData {
  wonders: WondersFormValues;
  loading: boolean;
  error?: Error;
  wondersCollectionRef: firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
  > | null;
}

const wondersInitialValues: WondersFormValues = {
  new7WondersOfTheWorld: {
    greatWallOfChina: false,
    petra: false,
    christTheRedeemer: false,
    machuPicchu: false,
    chichenItza: false,
    colosseum: false,
    tajMahal: false,
  },
  new7WondersOfNature: {
    tableMountain: false,
    iguazuFalls: false,
    komodoIsland: false,
    halongBay: false,
    puertoPrincesaUndergroundRiver: false,
    amazon: false,
    jejuIsland: false,
  },
};

export function useWonders(): WondersData {
  const [user] = useAuthState(auth);
  const wondersCollectionRef = user
    ? firestore
        .collection('users')
        .doc(user?.uid)
        .collection('wonders')
    : null;
  const [wondersSnapshot, loading, error] = useCollection(wondersCollectionRef);

  const wondersData =
    wondersSnapshot?.docs.reduce<WondersFormValues>((acc, currentValue) => {
      acc[currentValue.id] = currentValue.data();
      return acc;
    }, wondersInitialValues) || wondersInitialValues;

  // Set initial data if user never visited this page before
  if (wondersSnapshot?.docs.length === 0 && wondersCollectionRef !== null) {
    wondersCollectionRef.doc('new7WondersOfTheWorld').set({
      ...wondersInitialValues.new7WondersOfTheWorld,
      createdAt: moment().toDate(),
    });
    wondersCollectionRef.doc('new7WondersOfNature').set({
      ...wondersInitialValues.new7WondersOfNature,
      createdAt: moment().toDate(),
    });
  }

  return {wonders: wondersData, wondersCollectionRef, loading, error};
}
