import React from 'react';
import {Image} from '@shopify/polaris';
import {logo192} from 'assets/images';

import './TopNav.scss';

export function TopNav() {
  return (
    <nav className="TopNav">
      <Image source={logo192} alt="Journey app" width={48} />
    </nav>
  );
}
