import moment from 'moment';

import {Trip} from 'types';

export const trips: Trip[] = [
  {
    country: 'Canada',
    completed: false,
    location: 'Some awesome location',
    startDate: moment(new Date('Mar 16, 2020')).toDate(),
    endDate: moment(new Date('Mar 28, 2020')).toDate(),
  },
  {
    country: 'Canada',
    completed: false,
    notes: 'some notes',
    location: 'Another location',
    startDate: moment(new Date('Sept 01, 2020')).toDate(),
    endDate: moment(new Date('Sept 17, 2020')).toDate(),
  },
  {
    country: 'United States',
    completed: true,
    notes: 'some notes',
    location: 'Some awesome location',
    startDate: moment(new Date('Mar 16, 2019')).toDate(),
    endDate: moment(new Date('Mar 28, 2019')).toDate(),
  },
  {
    country: 'Peru',
    completed: true,
    notes: 'some notes',
    location: 'Some awesome location',
    startDate: moment(new Date('Mar 16, 2019')).toDate(),
    endDate: moment(new Date('Mar 28, 2019')).toDate(),
  },
];
