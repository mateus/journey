import React from 'react';
import {EmptyState} from '@shopify/polaris';
import {useHistory} from 'react-router-dom';

import {emptyState} from 'assets';

export function NotFound() {
  const history = useHistory();

  const goBackHome = () => {
    history.push('/');
  };

  return (
    <EmptyState
      heading="Page not found"
      action={{
        content: 'Go back to homepage',
        onAction: goBackHome,
      }}
      image={emptyState}
    >
      <p>The page your are looking for was not found.</p>
    </EmptyState>
  );
}
