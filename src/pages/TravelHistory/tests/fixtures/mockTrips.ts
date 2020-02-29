import moment from 'moment';

import {Trip, QueryTripCollection} from 'types';
import {mockTrip, mockTripCollection} from 'utilities/trip';

export const mockTrips: Trip[] = [
  mockTrip({
    id: '4',
    countryCode: 'PR',
    notes: '4 day Inca Trail to Matchu Picchu.',
    location: 'Cusco',
    startDate: moment(new Date('Jan 16, 2019')).toDate(),
    endDate: moment(new Date('Jan 28, 2019')).toDate(),
  }),
  mockTrip({
    id: '3',
    countryCode: 'US',
    location: 'San Francisco, CA',
    startDate: moment(new Date('Mar 16, 2019')).toDate(),
    endDate: moment(new Date('Mar 28, 2019')).toDate(),
  }),
  mockTrip({
    id: '5',
    countryCode: 'BR',
    notes: '4 day Inca Trail to Matchu Picchu.',
    location: 'Belo Horizonte and Barbacena, MG',
    startDate: moment(new Date('Mar 16, 2018')).toDate(),
    endDate: moment(new Date('Mar 28, 2018')).toDate(),
  }),
  mockTrip({
    id: '5',
    countryCode: 'CA',
    notes: 'Field trip days.',
    location: 'Montreal, QC',
    startDate: moment(new Date('Jun 1, 2019')).toDate(),
    endDate: moment(new Date('Jun 6, 2019')).toDate(),
  }),
  mockTrip({
    id: '2',
    countryCode: 'CA',
    location: 'Toronto, ON',
    startDate: moment(new Date('Sept 01, 2020')).toDate(),
    endDate: moment(new Date('Sept 17, 2020')).toDate(),
  }),
  mockTrip({
    id: '1',
    countryCode: 'CA',
    location: 'Kingston, ON',
    startDate: moment(new Date('Mar 16, 2020')).toDate(),
    endDate: moment(new Date('Mar 28, 2020')).toDate(),
  }),
];

export const mockDataTrips: QueryTripCollection[] = [
  mockTripCollection({
    id: '4',
    countryCode: 'PR',
    notes: '4 day Inca Trail to Matchu Picchu.',
    location: 'Cusco',
    startDate: moment(new Date('Jan 16, 2019')).toDate(),
    endDate: moment(new Date('Jan 28, 2019')).toDate(),
  }),
  mockTripCollection({
    id: '3',
    countryCode: 'US',
    location: 'San Francisco, CA',
    startDate: moment(new Date('Mar 16, 2019')).toDate(),
    endDate: moment(new Date('Mar 28, 2019')).toDate(),
  }),
  mockTripCollection({
    id: '5',
    countryCode: 'BR',
    notes: '4 day Inca Trail to Matchu Picchu.',
    location: 'Belo Horizonte and Barbacena, MG',
    startDate: moment(new Date('Mar 16, 2018')).toDate(),
    endDate: moment(new Date('Mar 28, 2018')).toDate(),
  }),
  mockTripCollection({
    id: '5',
    countryCode: 'CA',
    notes: 'Field trip days.',
    location: 'Montreal, QC',
    startDate: moment(new Date('Jun 1, 2019')).toDate(),
    endDate: moment(new Date('Jun 6, 2019')).toDate(),
  }),
  mockTripCollection({
    id: '2',
    countryCode: 'CA',
    location: 'Toronto, ON',
    startDate: moment(new Date('Sept 01, 2020')).toDate(),
    endDate: moment(new Date('Sept 17, 2020')).toDate(),
  }),
  mockTripCollection({
    id: '1',
    countryCode: 'CA',
    location: 'Kingston, ON',
    startDate: moment(new Date('Mar 16, 2020')).toDate(),
    endDate: moment(new Date('Mar 28, 2020')).toDate(),
  }),
];
