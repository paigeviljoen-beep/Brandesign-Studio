import { useState } from 'react'
import type { ProjectTask, RequiredSkill } from '../types'
import TagInput from './TagInput'

function emptyTask(): ProjectTask {
  const d = new Date()
  d.setDate(d.getDate() + 14)
  return {
    id: crypto.randomUUID(),
    name: '',
    client: '',
    requiredSkills: [{ name: '', importance: 5 }],
    growthTags: [],
    estimatedHours: 20,
    deadline: d.toISOString().slice(0, 10),
  }
}

export default function TaskForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: ProjectTask
  onSave: (task: ProjectTask) => void
  onCancel: () => void
}) {
  const [task, setTask] = useState<ProjectTask>(initial ?? emptyTask())

  function updateSkill(index: number, patch: Partial<RequiredSkill>) {
    setTask((t) => ({
      ...t,
      requiredSkills: t.requiredSkills.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }))
  }

  function addSkill() {
    setTask((t) => ({ ...t, requiredSkills: [...t.requiredSkills, { name: '', importance: 5 }] }))
  }

  function removeSkill(index: number) {
    setTask((t) => ({ ...t, requiredSkills: t.requiredSkills.filter((_, i) => i !== index) }))
  }

  function submit() {
    if (!task.name.trim()) return
    onSave({
      ...task,
      requiredSkills: task.requiredSkills.filter((s) => s.name.trim()),
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Project / task name</span>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={task.name}
            onChange={(e) => setTask((t) => ({ ...t, name: e.target.value }))}
            placeholder="Aster Cafe Rebrand"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Client</span>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={task.client}
            onChange={(e) => setTask((t) => ({ ...t, client: e.target.value }))}
            placeholder="Aster Cafe"
          />
        </label>
      </div>

      <div>
        <span className="mb-1 block text-sm font-medium text-gray-700">
          Required skills <span className="font-normal text-gray-400">(importance 0-10)</span>
        </span>
        <div className="space-y-2">
          {task.requiredSkills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                value={skill.name}
                onChange={(e) => updateSkill(i, { name: e.target.value })}
                placeholder="Skill name, e.g. Brand Identity"
              />
              <input
                type="range"
                min={0}
                max={10}
                value={skill.importance}
                onChange={(e) => updateSkill(i, { importance: Number(e.target.value) })}
                className="w-28"
              />
              <span className="w-6 text-right text-sm tabular-nums text-gray-600">
                {skill.importance}
              </span>
              <button
                type="button"
                onClick={() => removeSkill(i)}
                className="text-gray-400 hover:text-red-500"
                aria-label="Remove skill"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSkill}
          className="mt-2 text-sm font-medium text-violet-600 hover:text-violet-800"
        >
          + Add required skill
        </button>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">
          Growth tags{' '}
          <span className="font-normal text-gray-400">
            (skills this project is a stretch opportunity for)
          </span>
        </span>
        <TagInput
          tags={task.growthTags}
          onChange={(growthTags) => setTask((t) => ({ ...t, growthTags }))}
          placeholder="Type a skill, press Enter"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Estimated hours</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={task.estimatedHours}
            onChange={(e) => setTask((t) => ({ ...t, estimatedHours: Number(e.target.value) }))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Deadline</span>
          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={task.deadline}
            onChange={(e) => setTask((t) => ({ ...t, deadline: e.target.value }))}
          />
        </label>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={submit}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Save
        </button>
      </div>
    </div>
  )
}
