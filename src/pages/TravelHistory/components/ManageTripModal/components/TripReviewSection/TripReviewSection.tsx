import React from 'react';
import moment from 'moment';
import {DisplayText, Stack, TextStyle, Range} from '@shopify/polaris';

import {Country} from 'types';
import {Flag} from 'components';

import './TripReviewSection.scss';

interface TripReviewSectionProps {
  location: string;
  sameDayValue: boolean;
  selectedDates: Range;
  notes?: string;
  countryCode?: Country['countryCode'];
}

export function TripReviewSection({
  countryCode,
  location,
  notes,
  sameDayValue,
  selectedDates,
}: TripReviewSectionProps) {
  return (
    <div className="TripReviewSection">
      <Stack vertical alignment="center" spacing="loose">
        <Stack vertical alignment="center" spacing="tight">
          <DisplayText size="small" element="h3">
            <TextStyle variation="subdued">
              <TextStyle variation="strong">{location || '...'}</TextStyle>
            </TextStyle>
          </DisplayText>
          <p>{renderTripDatesHumanized()}</p>
          {notes && (
            <p>
              <TextStyle variation="subdued">{notes}</TextStyle>
            </p>
          )}
        </Stack>
        {countryCode && <Flag countryCode={countryCode} />}
      </Stack>
    </div>
  );

  function renderTripDatesHumanized() {
    return sameDayValue ? (
      <TextStyle variation="strong">
        {moment(selectedDates.start).format('ll')}
      </TextStyle>
    ) : (
      <>
        <TextStyle variation="strong">
          {moment(selectedDates.start).format('ll')}
        </TextStyle>{' '}
        until{' '}
        <TextStyle variation="strong">
          {moment(selectedDates.end).format('ll')}
        </TextStyle>
      </>
    );
  }
}
