export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Trip {
  id: string;
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

// Firestore will return endDate and startDate as Timestamp instead of Date
export interface QueryTripCollection
  extends Omit<Trip, 'endDate' | 'startDate'> {
  endDate: Timestamp;
  startDate: Timestamp;
}
