import React from 'react';
import {Card, Caption, Heading, List, TextStyle, Stack} from '@shopify/polaris';
import moment from 'moment';

import {Trip} from 'types';

export interface UpcomingTripsCardProps {
  list: Trip[];
}

export function UpcomingTripsCard({list}: UpcomingTripsCardProps) {
  const content =
    list.length > 0 ? (
      <List type="bullet">
        {list.map(({location, startDate, endDate}) => (
          <List.Item key={startDate + location}>
            <Stack vertical spacing="extraTight">
              <Heading>Trip to {location}</Heading>
              <TextStyle variation="subdued">
                <Caption>{caption(startDate, endDate)}</Caption>
              </TextStyle>
            </Stack>
          </List.Item>
        ))}
      </List>
    ) : (
      <p>
        <TextStyle variation="subdued">You have no upcoming trips.</TextStyle>
      </p>
    );

  return (
    <Card title="Upcoming" sectioned>
      {content}
    </Card>
  );

  function caption(startDate: Date, endDate: Date) {
    const start = moment(startDate).format('ll');
    const end = moment(endDate).format('ll');
    const startMarkup = <TextStyle variation="strong">{start}</TextStyle>;
    const endMarkup = <TextStyle variation="strong">{end}</TextStyle>;

    return start === end ? (
      startMarkup
    ) : (
      <>
        {startMarkup} until {endMarkup}
      </>
    );
  }
}
