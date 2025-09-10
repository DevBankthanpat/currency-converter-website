type RateCardProps = {
  code: string;
  value?: number;
  onClick?: (code: string) => void;
};

export default function RateCard({ code, value, onClick  }: RateCardProps) {
  return (
    <div 
      onClick={() => onClick?.(code)} 
      className="border rounded-lg p-3 text-sm bg-white/5 border-white/10"
    >
      <div className="text-gray-400">{code.toUpperCase()}</div>
      <div className="font-mono text-base">{Number.isFinite(value) ? value?.toFixed(4) : '—'}</div>
    </div>
  );
}
