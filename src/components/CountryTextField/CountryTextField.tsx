import React, {useState, useEffect, useCallback} from 'react';
import {Autocomplete, Icon} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';

import {countries} from 'utilities/countries.json';
import {DEFAULT_COUNTRY} from 'utilities/countries';
import {Country} from 'types';

interface CountryTextFieldProps {
  error?: string;
  country?: Country;
  onChange(country: Country): void;
}

export function CountryTextField({
  error,
  country,
  onChange,
}: CountryTextFieldProps) {
  const deselectedOptions = countries.map(({name, code}) => {
    return {value: code, label: name};
  });

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(country?.label || '');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      if (selected.length === 0) {
        return;
      }

      const matchedOption = options.find((option) => {
        return option.value.match(selected[0]);
      });

      const inputValue = matchedOption?.label || '';
      setSelectedOptions(selected);
      setInputValue(inputValue);

      onChange(
        matchedOption
          ? {countryCode: matchedOption.value, label: matchedOption.label}
          : DEFAULT_COUNTRY,
      );
    },
    [onChange, options],
  );

  useEffect(() => {
    if (country) setInputValue(country.label);
  }, [country]);

  const textField = (
    <Autocomplete.TextField
      error={error}
      onChange={updateText}
      label="Country"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="inkLighter" />}
      placeholder={DEFAULT_COUNTRY.label}
    />
  );

  return (
    <Autocomplete
      options={options}
      selected={selectedOptions}
      onSelect={updateSelection}
      textField={textField}
    />
  );
}
