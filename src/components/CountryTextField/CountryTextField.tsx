import React, {useState, useCallback} from 'react';
import {Autocomplete, Icon} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';

import {countries} from './countries.json';

interface CountryTextFieldProps {
  value: string;
  onChange(selected: string): void;
}

export function CountryTextField({value, onChange}: CountryTextFieldProps) {
  const deselectedOptions = countries.map(({name, code}) => {
    return {value: code, label: name};
  });

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(value);
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

      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption?.label || '';
      });

      const inputValue = selectedValue.length ? selectedValue[0] : '';
      setSelectedOptions(selected);
      setInputValue(inputValue);
      onChange(inputValue);
    },
    [onChange, options],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Country"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="inkLighter" />}
      placeholder="Canada"
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
