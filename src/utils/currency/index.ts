import {CURRENCY_CODE, CurrencyCodes} from './types';

export const getCurrencyCode = (currency: CurrencyCodes = 'BRL'): string => {
  return CURRENCY_CODE[currency] ?? '';
};

export const toCurrencyWithOutCode = (
  value: number | string = '',
  currency: CurrencyCodes = 'BRL',
  onlyDecimalSeparator = false,
): string => {
  if (!value && value !== 0) {
    return '';
  }
  switch (currency) {
    case 'BRL':
    default:
      const formatedValue = Number(value)
        .toFixed(2)
        .toString()
        .replace('.', ',');
      if (onlyDecimalSeparator) {
        return formatedValue;
      }
      return formatedValue
        .split(/(?=(?:\d{3})+(?:,|$))/g)
        .join('.')
        .replace('-.', '-');
  }
};

export const toCurrencyWithCode = (
  value?: number | string,
  currency: CurrencyCodes = 'BRL',
  defaultMessageOnError = '-',
): string => {
  if (!value && value !== 0) {
    return defaultMessageOnError;
  }
  let valueNumber = Number(value);

  if (isNaN(valueNumber)) {
    const formatedNumber = Number(value.toString().replace(',', '.'));
    if (isNaN(formatedNumber)) {
      return defaultMessageOnError;
    }
    valueNumber = formatedNumber;
  }

  const formatedValue = toCurrencyWithOutCode(Math.abs(valueNumber), currency);

  const currencyCode = CURRENCY_CODE[currency] || '';

  const signal = valueNumber < 0 ? '- ' : '';
  return `${signal}${currencyCode} ${formatedValue}`;
};
