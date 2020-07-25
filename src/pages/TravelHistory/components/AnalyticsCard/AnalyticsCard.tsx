import React from 'react';
import moment from 'moment';
import {Card, Caption, TextContainer, TextStyle, Stack} from '@shopify/polaris';

import {Flag} from 'components';
import {Trip} from 'types';

import {
  earliestTrip,
  filterUpcomingTrips,
  listOfCountriesVisited,
  listOfPlacesVisited,
} from '../../utilities';

interface AnalyticsCardProps {
  trips: Trip[];
}

export function AnalyticsCard({trips}: AnalyticsCardProps) {
  const completedTrips = filterUpcomingTrips(trips).length;
  const countriesVisited = listOfCountriesVisited(trips);
  const totalCountriesVisited = countriesVisited.length;
  const totalPlacesVisited = listOfPlacesVisited(trips).length;
  const trackingSince = moment(earliestTrip(trips).startDate).format('ll');

  const flags = countriesVisited.map((countryCode) => (
    <Flag key={countryCode} countryCode={countryCode} size="small" svg />
  ));

  return (
    <Card sectioned>
      <Stack vertical spacing="loose">
        <TextContainer spacing="tight">
          <p>
            <TextStyle variation="strong">{completedTrips}</TextStyle> trips
          </p>
          <p>
            <TextStyle variation="strong">{totalPlacesVisited}</TextStyle>{' '}
            places visited
          </p>
          <>
            <p>
              <TextStyle variation="strong">{totalCountriesVisited}</TextStyle>{' '}
              countries visited
            </p>
            <div aria-label="Visited countries">
              <Stack spacing="extraTight">{flags}</Stack>
            </div>
          </>
        </TextContainer>
        <Stack distribution="center">
          <Caption>Tracking trips since {trackingSince}</Caption>
        </Stack>
      </Stack>
    </Card>
  );
}
