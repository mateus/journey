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

export interface TripDetailsCardProps {
  trip: Trip;
  completed: boolean;
  onEdit(): void;
}

export const TripDetailsCard = memo(function TripDetailsCard({
  onEdit,
  completed,
  trip: {location, notes, startDate, endDate, countryCode, id},
}: TripDetailsCardProps) {
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
          {renderBadge()}
        </Stack>
        {renderDatesCaption()}
        {notes && <p>{notes}</p>}
      </Stack>
    </ResourceItem>
  );

  function renderDatesCaption() {
    const start = moment(startDate).format('LL');
    const end = moment(endDate).format('LL');

    if (start === end) {
      return <Caption>{start}</Caption>;
    } else {
      return (
        <Caption>
          {start} - {end}
        </Caption>
      );
    }
  }

  function renderBadge() {
    return completed ? null : <Badge status="attention">Upcoming</Badge>;
  }
});
