import React, {memo} from 'react';
import faker from 'faker';
import {
  Badge,
  Caption,
  DisplayText,
  Stack,
  ResourceItem,
} from '@shopify/polaris';
import moment from 'moment';

import {Flag} from 'components';
import {Trip} from 'types';

import './TripDetails.scss';

export interface TripDetailsProps {
  trip: Trip;
  completed: boolean;
  onEdit(): void;
}

export const TripDetails = memo(function TripDetails({
  onEdit,
  completed,
  trip: {location, notes, startDate, endDate, countryCode, id},
}: TripDetailsProps) {
  return (
    <ResourceItem
      id={id || faker.random.uuid()}
      onClick={onEdit}
      media={
        <div className="FlagContainer">
          <Flag countryCode={countryCode} svg />
        </div>
      }
      accessibilityLabel={`Trip to ${location}`}
    >
      <Stack vertical spacing="extraTight">
        <Stack alignment="center" spacing="tight">
          <DisplayText size="small" element="h3">
            {location}
          </DisplayText>
          {!completed && <Badge status="attention">Upcoming</Badge>}
        </Stack>
        {renderDatesCaption()}
        {notes && <p>{notes}</p>}
      </Stack>
    </ResourceItem>
  );

  function renderDatesCaption() {
    const start = moment(startDate).format('LL');
    const end = moment(endDate).format('LL');
    const caption = start === end ? start : `${start} - ${end}`;

    return <Caption>{caption}</Caption>;
  }
});
