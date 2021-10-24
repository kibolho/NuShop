import * as currency from './index';

describe('Testing currency util', () => {
  describe('getCurrencyCode', () => {
    it('should return BRL currency code', () => {
      expect(currency.getCurrencyCode()).toBe('R$');
      expect(currency.getCurrencyCode('BRL')).toBe('R$');
    });
  });

  describe('toCurrencyWithOutCode', () => {
    it.each`
      value             | code     | onlyDecimalSeparator | expected
      ${'0.05'}         | ${'BRL'} | ${false}             | ${'0,05'}
      ${'0.22'}         | ${'BRL'} | ${false}             | ${'0,22'}
      ${'22.00'}        | ${'BRL'} | ${false}             | ${'22,00'}
      ${'2131.23'}      | ${'BRL'} | ${false}             | ${'2.131,23'}
      ${'123223.42'}    | ${'BRL'} | ${true}              | ${'123223,42'}
      ${'123123.21'}    | ${'BRL'} | ${false}             | ${'123.123,21'}
      ${'89437123.42'}  | ${'BRL'} | ${true}              | ${'89437123,42'}
      ${'89437123.42'}  | ${'BRL'} | ${false}             | ${'89.437.123,42'}
      ${'784562145.42'} | ${'BRL'} | ${false}             | ${'784.562.145,42'}
    `(
      'should format $value to currency',
      ({value, code, onlyDecimalSeparator, expected}) => {
        const result = currency.toCurrencyWithOutCode(
          value,
          code,
          onlyDecimalSeparator,
        );
        expect(result).toEqual(expected);
      },
    );
  });

  describe('toCurrencyWithCode', () => {
    it('should return error message', () => {
      expect(currency.toCurrencyWithCode('nan_value')).toBe('-');
      expect(
        currency.toCurrencyWithCode('nan_value', 'BRL', 'Error message'),
      ).toBe('Error message');
    });

    it.each`
      value             | code     | expected
      ${'0.05'}         | ${'BRL'} | ${'R$ 0,05'}
      ${'0.22'}         | ${'BRL'} | ${'R$ 0,22'}
      ${'22.00'}        | ${'BRL'} | ${'R$ 22,00'}
      ${'345,76'}       | ${'BRL'} | ${'R$ 345,76'}
      ${'2131.23'}      | ${'BRL'} | ${'R$ 2.131,23'}
      ${'123123.21'}    | ${'BRL'} | ${'R$ 123.123,21'}
      ${'123223.42'}    | ${'BRL'} | ${'R$ 123.223,42'}
      ${'89437123.42'}  | ${'BRL'} | ${'R$ 89.437.123,42'}
      ${'89437123.42'}  | ${'BRL'} | ${'R$ 89.437.123,42'}
      ${'784562145.42'} | ${'BRL'} | ${'R$ 784.562.145,42'}
    `(
      'should format $value to currency with code',
      ({value, code, expected}) => {
        const result = currency.toCurrencyWithCode(value, code);
        expect(result).toEqual(expected);
      },
    );
  });
});
