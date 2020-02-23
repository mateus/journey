import React, {ComponentProps} from 'react';
import ReactCountryFlag from 'react-country-flag';

export function Flag(props: ComponentProps<typeof ReactCountryFlag>) {
  return (
    <ReactCountryFlag
      {...props}
      svg
      style={{
        width: 'auto',
        height: '26px',
        borderRadius: '3px',
      }}
    />
  );
}
