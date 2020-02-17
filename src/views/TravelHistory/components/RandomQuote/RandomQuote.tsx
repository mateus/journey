import React from 'react';
import {TextStyle} from '@shopify/polaris';

import {quotes} from './quotes';
import './RandomQuote.scss';

export function RandomQuote() {
  return (
    <blockquote>
      <i>
        <TextStyle variation="subdued">{getRandomQuote()}</TextStyle>
      </i>
    </blockquote>
  );
}

function getRandomQuote() {
  const randomValue = Math.floor(Math.random() * Object.keys(quotes).length);
  return quotes[Object.keys(quotes)[randomValue]];
}
