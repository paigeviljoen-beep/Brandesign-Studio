import type { ProjectTask } from '../types'

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
}: {
  tasks: ProjectTask[]
  onEdit: (task: ProjectTask) => void
  onDelete: (id: string) => void
}) {
  if (tasks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        No projects/tasks yet. Add one to get started.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((t) => {
        const daysLeft = Math.ceil(
          (new Date(t.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        )
        return (
          <div key={t.id} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500">{t.client}</p>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(t)}
                  className="rounded-md px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(t.id)}
                  className="rounded-md px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {t.requiredSkills.map((s) => (
                <span
                  key={s.name}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                >
                  {s.name} · imp {s.importance}
                </span>
              ))}
            </div>

            {t.growthTags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {t.growthTags.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-violet-50 px-2 py-0.5 text-xs text-violet-600"
                  >
                    ↗ {g}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-3 text-xs text-gray-500">
              {t.estimatedHours} hrs · due {new Date(t.deadline).toLocaleDateString()}{' '}
              {daysLeft >= 0 ? `(${daysLeft}d left)` : '(overdue)'}
            </p>
          </div>
        )
      })}
    </div>
  )
}
