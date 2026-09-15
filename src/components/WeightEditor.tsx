import type { CategoryWeights } from '../types'
import { DEFAULT_WEIGHTS } from '../types'

const FIELDS: { key: keyof CategoryWeights; label: string }[] = [
  { key: 'skills', label: 'Skills' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'growth', label: 'Growth' },
]

export default function WeightEditor({
  weights,
  onChange,
}: {
  weights: CategoryWeights
  onChange: (weights: CategoryWeights) => void
}) {
  const total = weights.skills + weights.capacity + weights.deadline + weights.growth

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Category weights</span>
        <button
          type="button"
          onClick={() => onChange(DEFAULT_WEIGHTS)}
          className="text-xs font-medium text-violet-600 hover:text-violet-800"
        >
          Reset to defaults
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
        {FIELDS.map(({ key, label }) => (
          <label key={key} className="block text-sm">
            <span className="mb-1 flex items-center justify-between text-gray-600">
              {label}
              <span className="tabular-nums text-gray-400">
                {weights[key]} ({total > 0 ? Math.round((weights[key] / total) * 100) : 0}%)
              </span>
            </span>
            <input
              type="range"
              min={0}
              max={10}
              value={weights[key]}
              onChange={(e) => onChange({ ...weights, [key]: Number(e.target.value) })}
              className="w-full"
            />
          </label>
        ))}
      </div>
    </div>
  )
}
