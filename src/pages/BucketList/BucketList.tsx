import React from 'react';
import {EmptyState, Page} from '@shopify/polaris';

import {EmptyStateBucketList} from 'assets';
import {DocumentTitle} from 'components';

export function BucketList() {
  return (
    <Page title="Bucket List">
      <DocumentTitle title="Bucket List" />
      <EmptyState image={EmptyStateBucketList} />
    </Page>
  );
}
