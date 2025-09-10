import { fetchJson } from '@/lib/http';
import { API_BASE } from '@/config/constants';
import type {
  CurrenciesMap,
  CurrencyCode,
  RatesMap,
  RateTable,
} from '@/types/model';

const toCode = (s: string) => s.trim().toLowerCase();

export class CurrencyService {
  static async list(): Promise<CurrenciesMap> {
    const json = await fetchJson<Record<string, string>>(`${API_BASE}.json`);

    const map: CurrenciesMap = Object.fromEntries(
      Object.entries(json).map(([k, v]) => [toCode(k), String(v)])
    );

    return map;
  }
  
  static async latest(base: CurrencyCode): Promise<RateTable> {
    const b = toCode(base);
    const json = await fetchJson<Record<string, unknown>>(`${API_BASE}/${b}.json`);

    const date = typeof json['date'] === 'string' ? (json['date'] as string) : '';
    const raw = json[b] as Record<string, unknown> | undefined;

    const rates: RatesMap = {};
    if (raw && typeof raw === 'object') {
      for (const [k, v] of Object.entries(raw)) {
        if (typeof v === 'number' && Number.isFinite(v)) {
          rates[toCode(k)] = v;
        }
      }
    }

    return { date, base: b, rates };
  }
}
