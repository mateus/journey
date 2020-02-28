export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Trip {
  id: string;
  completed: boolean;
  countryCode: string;
  endDate: Date;
  location: string;
  notes?: string;
  startDate: Date;
}

export interface Country {
  label: string;
  countryCode: string;
}

export interface QueryTripCollection
  extends Omit<Trip, 'endDate' | 'startDate'> {
  endDate: Timestamp;
  startDate: Timestamp;
}
