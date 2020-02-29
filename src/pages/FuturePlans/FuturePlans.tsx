import React from 'react';
import {EmptyState, Page} from '@shopify/polaris';

import {EmptyStateTravelBooking} from 'assets';
import {DocumentTitle} from 'components';

export function FuturePlans() {
  return (
    <Page title="Future Plans">
      <DocumentTitle title="Future Plans" />
      <EmptyState
        heading="Soon ...hand tight"
        image={EmptyStateTravelBooking}
      />
    </Page>
  );
}
