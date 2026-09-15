import { useMemo, useState } from 'react'
import type { ProjectTask, Resource } from '../types'
import { rankResourcesForTask } from '../lib/scoring'
import ScoreBar from './ScoreBar'

export default function AllocationView({
  resources,
  tasks,
}: {
  resources: Resource[]
  tasks: ProjectTask[]
}) {
  const [selectedTaskId, setSelectedTaskId] = useState<string>(tasks[0]?.id ?? '')
  const selectedTask = tasks.find((t) => t.id === selectedTaskId)

  const ranked = useMemo(
    () => (selectedTask ? rankResourcesForTask(resources, selectedTask) : []),
    [resources, selectedTask],
  )

  if (tasks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        Add a project/task to see resource recommendations.
      </p>
    )
  }

  if (resources.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        Add team members to see resource recommendations.
      </p>
    )
  }

  return (
    <div className="space-y-5">
      <label className="block max-w-md text-sm">
        <span className="mb-1 block font-medium text-gray-700">Project / task</span>
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
        >
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} — {t.client}
            </option>
          ))}
        </select>
      </label>

      {selectedTask && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
          <span className="font-medium text-gray-800">{selectedTask.name}</span>
          {' · '}
          {selectedTask.estimatedHours} hrs
          {' · '}
          due {new Date(selectedTask.deadline).toLocaleDateString()}
          {selectedTask.requiredSkills.length > 0 && (
            <>
              {' · needs '}
              {selectedTask.requiredSkills.map((s) => s.name).join(', ')}
            </>
          )}
        </div>
      )}

      <div className="space-y-3">
        {ranked.map((r, i) => (
          <div
            key={r.resource.id}
            className={`rounded-xl border p-4 ${
              i === 0
                ? 'border-violet-300 bg-violet-50 shadow-sm'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ background: r.resource.color }}
                >
                  {r.resource.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                <div>
                  <p className="font-medium text-gray-900">{r.resource.name}</p>
                  <p className="text-xs text-gray-500">{r.resource.role}</p>
                </div>
                {i === 0 && (
                  <span className="ml-1 rounded-full bg-violet-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                    Recommended
                  </span>
                )}
                {!r.feasible && (
                  <span className="ml-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-600">
                    At risk of missing deadline
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold tabular-nums text-gray-900">
                  {r.total.toFixed(1)}
                  <span className="text-sm font-normal text-gray-400">/10</span>
                </p>
                <p className="text-xs text-gray-500">{r.freeHoursPerWeek} hrs/week free</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              <ScoreBar label="Skills" score={r.scores.skills} />
              <ScoreBar label="Growth" score={r.scores.growth} />
              <ScoreBar label="Capacity" score={r.scores.capacity} />
              <ScoreBar label="Deadline" score={r.scores.deadline} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
