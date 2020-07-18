import React from 'react';
import {EmptyState, Page} from '@shopify/polaris';

import {EmptyStateNotes} from 'assets';
import {DocumentTitle} from 'components';

export function FuturePlans() {
  return (
    <Page title="Future Plans">
      <DocumentTitle title="Future Plans" />
      <EmptyState image={EmptyStateNotes} />
    </Page>
  );
}
