import React from 'react';
import {Image} from '@shopify/polaris';

import {logo192} from 'assets/images';

import './Footer.scss';

export function Footer() {
  return (
    <footer className="Footer">
      <Image source={logo192} alt="Journey app" width={40} height={40} />
    </footer>
  );
}
