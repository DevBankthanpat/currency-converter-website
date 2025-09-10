type Props = {
    value: string;
    options: Array<{ code: string; name?: string }>;
    onChange: (val: string) => void;
    className?: string;
};

// this dropdown for currency
export default function CurrencyDropdown({ value, options, onChange, className }: Props) {
    return (
        <div className={`w-full min-w-0 ${className ?? ""}`}>
            <select
                className="w-full block min-w-0 appearance-none
                   px-3 py-2 rounded-lg bg-white/90 text-gray-900 text-sm font-medium shadow-sm
                   border border-black/10 hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map(({ code, name }) => (
                    <option key={code} value={code}>
                        {code.toUpperCase()} {name ? `- ${name}` : ""}
                    </option>
                ))}
            </select>
        </div>
    );
}
