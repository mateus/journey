import React from 'react';
import {EmptyState} from '@shopify/polaris';

import {EmptyStateNotFound} from 'assets';
import {DocumentTitle} from 'components';

export function NotFound() {
  return (
    <>
      <DocumentTitle title="Page not found" />
      <EmptyState heading="Page not found" image={EmptyStateNotFound}>
        <p>Nothing here.</p>
      </EmptyState>
    </>
  );
}
