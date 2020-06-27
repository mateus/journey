import React, {memo} from 'react';
import {Badge, Card, Caption, DisplayText, Stack} from '@shopify/polaris';
import moment from 'moment';

import {Flag} from 'components';
import {Trip} from 'types';

export interface TripDetailsCardProps {
  trip: Trip;
  completed: boolean;
  onEdit(): void;
}

export const TripDetailsCard = memo(function TripDetailsCard({
  onEdit,
  completed,
  trip: {location, notes, startDate, endDate, countryCode},
}: TripDetailsCardProps) {
  return (
    <Card
      title={
        <Stack vertical spacing="extraTight">
          <Stack alignment="center" spacing="tight">
            <DisplayText size="small" element="h3">
              {location}
            </DisplayText>
            {renderBadge()}
          </Stack>
          {renderDatesCaption()}
        </Stack>
      }
      actions={[{content: 'Edit', onAction: onEdit}]}
      subdued={completed}
      sectioned
    >
      <Stack wrap={false} spacing="extraLoose" alignment="trailing">
        <Stack.Item fill>{notes && <p>{notes}</p>}</Stack.Item>
        <Flag
          countryCode={countryCode}
          svg
          style={{
            width: 'auto',
            height: '26px',
            borderRadius: '3px',
          }}
        />
      </Stack>
    </Card>
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
    return completed ? (
      <Badge>Completed</Badge>
    ) : (
      <Badge status="attention">Upcoming</Badge>
    );
  }
});
