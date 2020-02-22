import React from 'react';

import {TopNav} from '../TopNav';
import {Footer} from '../Footer';

export interface FrameProps {
  children?: React.ReactChild;
}

export function Frame({children}: FrameProps) {
  return (
    <div className="Frame">
      <TopNav />
      {children}
      <Footer />
    </div>
  );
}
