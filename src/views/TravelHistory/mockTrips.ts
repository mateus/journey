import moment from 'moment';

import {Trip} from 'types';

export const trips: Trip[] = [
  {
    id: '1',
    countryCode: 'CA',
    completed: false,
    location: 'Kingston, ON',
    startDate: moment(new Date('Mar 16, 2020')).toDate(),
    endDate: moment(new Date('Mar 28, 2020')).toDate(),
  },
  {
    id: '2',
    countryCode: 'CA',
    completed: false,
    location: 'Toronto, ON',
    startDate: moment(new Date('Sept 01, 2020')).toDate(),
    endDate: moment(new Date('Sept 17, 2020')).toDate(),
  },
  {
    id: '3',
    countryCode: 'US',
    completed: true,
    location: 'San Francisco, CA',
    startDate: moment(new Date('Mar 16, 2019')).toDate(),
    endDate: moment(new Date('Mar 28, 2019')).toDate(),
  },
  {
    id: '4',
    countryCode: 'PR',
    completed: true,
    notes: '4 day Inca Trail to Matchu Picchu.',
    location: 'Cusco',
    startDate: moment(new Date('Mar 16, 2019')).toDate(),
    endDate: moment(new Date('Mar 28, 2019')).toDate(),
  },
  {
    id: '5',
    countryCode: 'BR',
    completed: true,
    notes: '4 day Inca Trail to Matchu Picchu.',
    location: 'Belo Horizonte and Barbacena, MG',
    startDate: moment(new Date('Mar 16, 2018')).toDate(),
    endDate: moment(new Date('Mar 28, 2018')).toDate(),
  },
];
