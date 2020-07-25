import React, {ComponentProps} from 'react';
import ReactCountryFlag from 'react-country-flag';
import {Tooltip} from '@shopify/polaris';

import {getCountryByCode} from 'utilities/countries';

type Size = 'small' | 'large';

interface FlagProps extends ComponentProps<typeof ReactCountryFlag> {
  size?: Size;
}

export function Flag({size = 'large', ...reactCountryFlagProps}: FlagProps) {
  const height = size === 'small' ? '18px' : '26px';
  const countryName =
    getCountryByCode(reactCountryFlagProps.countryCode)?.label || '';

  return (
    <Tooltip content={countryName}>
      <ReactCountryFlag
        {...reactCountryFlagProps}
        svg
        style={{
          width: 'auto',
          height,
          borderRadius: '3px',
        }}
      />
    </Tooltip>
  );
}
