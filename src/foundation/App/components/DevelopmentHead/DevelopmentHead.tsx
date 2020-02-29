import React from 'react';
import Favicon from 'react-favicon';

import {publicURL} from 'config/variables';

import './DevelopmentHead.scss';

export function DevelopmentHead() {
  return (
    <>
      <Favicon url={`${publicURL}/favicons/development/favicon.ico`} />
      <aside className="DevStatus">
        <strong>development</strong> mode
      </aside>
    </>
  );
}
