function colorFor(score: number): string {
  if (score >= 7.5) return '#16a34a'
  if (score >= 5) return '#f59e0b'
  return '#dc2626'
}

export default function ScoreBar({ label, score }: { label: string; score: number }) {
  const pct = Math.max(0, Math.min(100, (score / 10) * 100))
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-28 shrink-0 text-gray-600">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: colorFor(score) }}
        />
      </div>
      <span className="w-9 shrink-0 text-right font-medium tabular-nums text-gray-800">
        {score.toFixed(1)}
      </span>
    </div>
  )
}
