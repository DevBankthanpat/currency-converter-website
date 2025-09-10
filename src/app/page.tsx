'use client';

import ConverterPanel from "@/components/ConverterPanel";
import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import RateCard from "@/components/RateCard";
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

    const currencyOptions = useMemo(() => {
        if (!currencies) return [];
        const all = Object.entries(currencies).map(([code, name]) => ({ code, name }));
        const top = all.filter(o => DEFAULT_CURRENCY.includes(o.code));
        const rest = all.filter(o => !DEFAULT_CURRENCY.includes(o.code));
        return [...top, ...rest];
    }, [currencies]);

    const swap = () => {
        setFrom(to);
        setTo(from);
    };

    if (loadingCur && !currencies) return <Loading />;
    if (curError) return <ErrorMessage message={`โหลดรายการสกุลเงินไม่สำเร็จ: ${curError}`} onRetry={() => {
        setCurrencies(null);
        setLoadingCur(true);
        setCurError(null);
        window.location.reload();
    }} />;

    if (ratesError) return <ErrorMessage message={`โหลดรายการสกุลเงินไม่สำเร็จ: ${ratesError}`} onRetry={() => {
        setCurrencies(null);
        setLoadingCur(true);
        setRatesError(null);
        window.location.reload();
    }} />;


    return (
        <main className="mx-auto max-w-2xl p-4 space-y-6">
            <h1 className="text-2xl font-semibold">Currency Converter</h1>

            {/* Controls */}
            <ConverterPanel
                from={from}
                to={to}
                amount={amount}
                result={Number.isFinite(result) ? result : null}
                currencyOptions={currencyOptions}
                onFromChange={setFrom}
                onToChange={setTo}
                onAmountChange={setAmount}
                onSwap={swap}
                loading={loadingRates && !table}
            />

            <p className="text-xs text-gray-500">
                Rates are updated daily (not live).
            </p>


            <section className="space-y-3">
                <h2 className="font-semibold mb-2">Exchange Rates</h2>

                {loadingRates && table ? (
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-32" />
                ) : table ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {DEFAULT_CURRENCY.slice(0, 16).map((code) => (
                            <RateCard
                                key={code}
                                code={code}
                                value={table.rates[code]}
                                onClick={(selected) => setTo(selected)}
                            />
                        ))}
                    </div>
                ) : null}
            </section>
        </main>
    );
}
