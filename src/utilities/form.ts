import {Field} from '@shopify/react-form';

export function mockField<T = string>(
  value: T = '' as any,
  overrides: Partial<Field<T>> = {},
) {
  return {
    defaultValue: value,
    dirty: false,
    error: undefined,
    newDefaultValue() {},
    onBlur() {},
    onChange() {},
    reset() {},
    runValidation() {
      return undefined;
    },
    setError() {},
    touched: false,
    value,
    ...overrides,
  };
}
