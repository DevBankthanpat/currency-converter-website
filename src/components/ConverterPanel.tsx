import CurrencyDropdown from "@/components/CurrencyDropdown";
import { Pencil } from "lucide-react";

type Option = { code: string; name?: string };

type Props = {
    from: string;
    to: string;
    amount: string;
    result: number | null;
    currencyOptions: Option[];
    onFromChange: (v: string) => void;
    onToChange: (v: string) => void;
    onAmountChange: (v: string) => void;
    onSwap: () => void;
    loading?: boolean;
};

export default function ConverterPanel({
    from, 
    to, 
    amount, 
    result, 
    currencyOptions,
    onFromChange, 
    onToChange, 
    onAmountChange, 
    onSwap, 
    loading,
}: Props) {
    return (
        <div className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-5 md:p-6 shadow-xl">
            {/* From Currency */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-300">
                    <span>From</span>
                    <Pencil size={14} className="text-gray-400" />
                </div>
                <div className="w-1/2 min-w-0 md:w-auto md:min-w-[260px]">
                <CurrencyDropdown
                    value={from}
                    options={currencyOptions}
                    onChange={onFromChange}
                />
                </div>
            </div>

            {/* Amount */}
            <div className="mt-2 text-6xl md:text-7xl font-semibold tracking-tight text-white">
                <input
                    className="bg-transparent outline-none w-full"
                    inputMode="decimal"
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>
            
            {/* Swap button */}
            <div className="relative my-6">
                <div className="h-px bg-white/15" />
                <button
                    type="button"
                    onClick={onSwap}
                    className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white text-gray-900 rounded-full w-8 h-8
                     flex items-center justify-center shadow-md border border-black/10 hover:scale-105 transition"
                    aria-label="Swap currencies"
                    title="Swap"
                >
                    ↕
                </button>
            </div>
            
            {/* To Currency */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">To</span>
                <div className="w-1/2 min-w-0 md:w-auto md:min-w-[260px]">
                <CurrencyDropdown
                    value={to}
                    options={currencyOptions}
                    onChange={onToChange}
                />
                </div>
            </div>
            
            {/* Result */}
            <div className="mt-2 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white">
                {loading ? (
                    <div className="animate-pulse h-12 bg-white/10 rounded" />
                ) : Number.isFinite(result ?? NaN) ? (
                    (result as number).toFixed(2)
                ) : (
                    "—"
                )}
            </div>
        </div>
    );
}
