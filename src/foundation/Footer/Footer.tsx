import React from 'react';
import {FooterHelp, Link} from '@shopify/polaris';

import './Footer.scss';

export function Footer() {
  return (
    <footer className="Footer">
      <FooterHelp>
        Help it at{' '}
        <Link external url="https://github.com/mateus/journey">
          GitHub
        </Link>
        .
      </FooterHelp>
    </footer>
  );
}
