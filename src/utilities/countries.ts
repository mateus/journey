import {Country} from 'types';

import {countries} from './countries.json';

export const DEFAULT_COUNTRY = {countryCode: 'CA', label: 'Canada'};

export function getCountryByCode(
  countryCode: Country['countryCode'],
): Country | undefined {
  const country = countries.find(({code}) => code === countryCode);

  if (country) {
    return {
      countryCode: country.code,
      label: country.name,
    };
  }
}

export function getCountryByLabel(
  label: Country['label'],
): Country | undefined {
  const country = countries.find(
    ({name}) => name.toLocaleLowerCase() === label.toLocaleLowerCase().trim(),
  );

  if (country) {
    return {
      countryCode: country.code,
      label: country.name,
    };
  }
}
