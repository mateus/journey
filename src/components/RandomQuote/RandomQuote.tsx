import React from 'react';
import {DisplayText, TextStyle} from '@shopify/polaris';

import {quotes} from './quotes';
import './RandomQuote.scss';

interface RandomQuoteProps {
  small?: boolean;
}

export function RandomQuote({small}: RandomQuoteProps) {
  const content = small ? (
    <TextStyle variation="subdued">{getRandomQuote()}</TextStyle>
  ) : (
    <DisplayText size="small">
      <TextStyle variation="subdued">{getRandomQuote()}</TextStyle>
    </DisplayText>
  );

  return (
    <blockquote>
      <i>{content}</i>
    </blockquote>
  );
}

function getRandomQuote() {
  const randomValue = Math.floor(Math.random() * Object.keys(quotes).length);
  return quotes[Object.keys(quotes)[randomValue]];
}
