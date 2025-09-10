export type CurrencyCode = string;
export type CurrencyName = string;

export type CurrenciesMap = Record<CurrencyCode, CurrencyName>;

export type RatesMap = Record<CurrencyCode, number>;

export interface RateTable {
  date: string;
  base: CurrencyCode;
  rates: RatesMap;
}

export interface ConversionRequest {
  amount: number;
  base: CurrencyCode;
  target: CurrencyCode;
}

export interface ConversionResult {
  request: ConversionRequest;
  rate: number;
  value: number;
  date: string;
}

export function canConvert(target: CurrencyCode, table?: RateTable): boolean {
  return !!table?.rates && Number.isFinite(table.rates[target]);
}