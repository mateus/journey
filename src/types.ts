export interface Trip {
  id: string;
  completed: boolean;
  countryCode: string;
  endDate: Date;
  location: string;
  notes?: string;
  startDate: Date;
}
