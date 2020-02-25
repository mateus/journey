import React from 'react';
import {EmptyState} from '@shopify/polaris';
import {useHistory} from 'react-router-dom';

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
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>The page your are looking for was not found.</p>
    </EmptyState>
  );
}
