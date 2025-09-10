type Props = {
  value: string;
  options: Array<{ code: string; name?: string }>;
  onChange: (val: string) => void;
};

export default function CurrencyDropdown({ value, options, onChange }: Props) {
  return (
    <select
      className="appearance-none px-3 py-2 rounded-lg bg-white/90 text-gray-900 text-sm font-medium shadow-sm
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
  );
}
