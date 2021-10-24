export type CurrencyCodes = 'BRL';
export type CurrencyCode = {[code in CurrencyCodes]: string};

export const CURRENCY_CODE: CurrencyCode = {
  BRL: 'R$',
};
