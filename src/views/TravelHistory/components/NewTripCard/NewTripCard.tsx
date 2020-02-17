import React, {useState, useCallback} from 'react';
import {
  Card,
  DisplayText,
  DatePicker,
  FormLayout,
  TextField,
  TextStyle,
  TextContainer,
} from '@shopify/polaris';
import moment from 'moment';

interface NewTripCardProps {
  location?: string;
  notes?: string;
}

export function NewTripCard({location = '', notes = ''}: NewTripCardProps) {
  const today = moment();
  const [locationValue, setLocation] = useState(location);
  const [notesValue, setNotes] = useState(notes);
  const [{month, year}, setDate] = useState({
    month: today.month(),
    year: today.year(),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: today.toDate(),
    end: today.add(5, 'days').toDate(),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );
  const handleLocationChange = useCallback(
    (newLocation) => setLocation(newLocation),
    [],
  );
  const handleNotesChange = useCallback((newNotes) => setNotes(newNotes), []);

  return (
    <Card primaryFooterAction={{content: 'Add trip'}}>
      <Card.Section>
        <FormLayout>
          <TextField
            label="Location"
            value={locationValue}
            placeholder="Anywhere"
            onChange={handleLocationChange}
          />
          <TextField
            multiline={2}
            label="Notes"
            value={notesValue}
            placeholder="Anything extra"
            onChange={handleNotesChange}
          />

          <DatePicker
            month={month}
            year={year}
            onChange={setSelectedDates}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
            allowRange
          />
        </FormLayout>
      </Card.Section>

      <Card.Section>
        <TextContainer spacing="tight">
          <DisplayText size="small" element="h3">
            Trip to {locationValue || '...'}
          </DisplayText>
          <p>
            Traveling from{' '}
            <TextStyle variation="strong">
              {moment(selectedDates.start).format('LL')}
            </TextStyle>{' '}
            until{' '}
            <TextStyle variation="strong">
              {moment(selectedDates.end).format('LL')}
            </TextStyle>
          </p>
          {notesValue && (
            <p>
              <TextStyle variation="subdued">{notesValue}</TextStyle>
            </p>
          )}
        </TextContainer>
      </Card.Section>
    </Card>
  );
}
