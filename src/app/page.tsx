'use client';

import { DEFAULT_CURRENCY } from "@/config/constants";
import { CurrencyService } from "@/services/currency";
import { CurrenciesMap, RateTable } from "@/types/model";
import { useEffect, useMemo, useState } from "react";

export default function Home() {

  const [currencies, setCurrencies] = useState<CurrenciesMap | null>(null);
  const [curError, setCurError] = useState<string | null>(null);
  const [loadingCur, setLoadingCur] = useState(true);

  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('thb');
  const [amount, setAmount] = useState('1');

  const [table, setTable] = useState<RateTable | null>(null);
  const [ratesError, setRatesError] = useState<string | null>(null);
  const [loadingRates, setLoadingRates] = useState(false);

  // First time loading
  useEffect(() => {
    let mounted = true;
    setLoadingCur(true);
    setCurError(null);

    CurrencyService.list()
    .then((map) => {
        if (!mounted) return;
        setCurrencies(map);
    })
    .catch((err) => {
      if (!mounted) return;
      console.error(err);
      setCurError('Failed to load currency list');
    })
    .finally(() => {
      if (!mounted) return;
      setLoadingCur(false);
    });

    return () => { 
      mounted = false; 
    }
  }, []);
  useEffect(() => {
    if (!from) return;
    let active = true;
    setLoadingRates(true);
    setRatesError(null);

    CurrencyService.latest(from)
      .then((t) => {
        if (!active) return;
        setTable(t);
      })
      .catch((err) => {
        if (!active) return;
        setRatesError(err?.message || 'Failed to load rates');
        setTable(null);
      })
      .finally(() => {
        if (!active) return;
        setLoadingRates(false);
      });

    return () => {
      active = false;
    };
  }, [from]);

  const rate = useMemo(() => (table?.rates?.[to] ?? NaN), [table, to]);
  const result = useMemo(() => {
    const amt = Number(amount);
    if (!Number.isFinite(amt) || !Number.isFinite(rate)) return NaN;
    return amt * rate;
  }, [amount, rate]);

  const currencyEntries = useMemo(() => {
    if (!currencies) return [];
    const all = Object.keys(currencies);
    const rest = all.filter((c) => !DEFAULT_CURRENCY.includes(c));
    return [...DEFAULT_CURRENCY, ...rest];
  }, [currencies]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  if (loadingCur && !currencies) {
    return (
      <main className="mx-auto max-w-2xl p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Currency Converter</h1>
        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </main>
    );
  }

  if (curError) {
    return (
      <main className="mx-auto max-w-2xl p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Currency Converter</h1>
        <p className="text-red-600">โหลดรายการสกุลเงินไม่สำเร็จ: {curError}</p>
        <button
          className="px-3 py-2 rounded bg-black text-white"
          onClick={() => {
            setCurrencies(null);
            setLoadingCur(true);
            setCurError(null);
            window.location.reload();
          }}
        >
          Retry
        </button>
      </main>
    );
  }


  return (
     <main className="mx-auto max-w-2xl p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Currency Converter</h1>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* From */}
        <select
          className="border rounded p-2 text-black"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {currencyEntries.map((code) => (
            <option key={code} value={code}>
              {code.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        {/* Amount */}
        <input
          className="border rounded p-2 bg-transparent text-white text-4xl"
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          className="px-3 py-2 rounded border"
          onClick={swap}
          title="Swap"
        >
          Swap
        </button>

        {ratesError && (
          <>
            <span className="text-red-600">โหลดอัตราแลกเปลี่ยนไม่สำเร็จ</span>
            <button
              className="px-3 py-2 rounded bg-black text-white"
              onClick={() => {
                setFrom((prev) => prev);
              }}
            >
              Retry
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* To */}
        <select
          className="border rounded p-2 text-black"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          {currencyEntries.map((code) => (
            <option key={code} value={code}>
              {code.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="min-h-10">
        {loadingRates && !table ? (
          <div className="animate-pulse h-6 bg-gray-200 rounded w-48" />
        ) : Number.isFinite(result) ? (

          <div className="text-lg text-4xl">
            <b>{result.toFixed(4)}</b> {to.toUpperCase()}
            {table?.date ? (
              <span className="text-sm text-gray-500"> (as of {table.date})</span>
            ) : null}
          </div>

        ) : (
          <div className="text-gray-500">—</div>
        )}
      </div>

      <section>
        <h2 className="font-semibold mb-2">Other currency Rates</h2>
        {loadingRates && table ? (
          <div className="animate-pulse h-4 bg-gray-200 rounded w-32" />
        ) : table ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DEFAULT_CURRENCY.slice(0, 8).map((code) => (
              <div key={code} className="border rounded p-2 text-sm">
                <div className="text-gray-600">{code.toUpperCase()}</div>
                <div className="font-mono">
                  {Number.isFinite(table.rates[code])
                    ? table.rates[code].toFixed(4)
                    : '—'}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
