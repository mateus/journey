import React, {useState} from 'react';
import {Badge, Card, Caption, DisplayText, Stack} from '@shopify/polaris';
import moment from 'moment';

import {Flag} from 'components';
import {Trip} from 'types';

import {ManageTripCard} from '..';

interface TripDetailsCardProps extends Trip {}

export function TripDetailsCard(trip: TripDetailsCardProps) {
  const {location, notes, startDate, endDate, countryCode, completed} = trip;
  const [isEditing, setIsEditing] = useState(false);
  const cardBadge = completed ? (
    <Badge>Completed</Badge>
  ) : (
    <Badge status="attention">Upcoming</Badge>
  );

  return isEditing ? (
    <ManageTripCard
      trip={trip}
      onClose={() => setIsEditing(false)}
      onSubmit={() => {}}
    />
  ) : (
    <Card
      title={
        <Stack vertical spacing="extraTight">
          <Stack alignment="center" spacing="tight">
            <DisplayText size="small" element="h3">
              {location}
            </DisplayText>
            {cardBadge}
          </Stack>
          <Caption>
            {moment(startDate).format('LL')} - {moment(endDate).format('LL')}
          </Caption>
        </Stack>
      }
      actions={[{content: 'Edit', onAction: () => setIsEditing(true)}]}
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
}
