import { useState } from 'react'
import type { Resource, Skill } from '../types'
import TagInput from './TagInput'

const PALETTE = ['#aa3bff', '#2dd4bf', '#f59e0b', '#60a5fa', '#f472b6', '#84cc16', '#fb7185']

function emptyResource(): Resource {
  return {
    id: crypto.randomUUID(),
    name: '',
    role: '',
    skills: [{ name: '', level: 5 }],
    growthAreas: [],
    capacityHoursPerWeek: 35,
    allocatedHoursPerWeek: 0,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
  }
}

export default function ResourceForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Resource
  onSave: (resource: Resource) => void
  onCancel: () => void
}) {
  const [resource, setResource] = useState<Resource>(initial ?? emptyResource())

  function updateSkill(index: number, patch: Partial<Skill>) {
    setResource((r) => ({
      ...r,
      skills: r.skills.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }))
  }

  function addSkill() {
    setResource((r) => ({ ...r, skills: [...r.skills, { name: '', level: 5 }] }))
  }

  function removeSkill(index: number) {
    setResource((r) => ({ ...r, skills: r.skills.filter((_, i) => i !== index) }))
  }

  function submit() {
    if (!resource.name.trim()) return
    onSave({
      ...resource,
      skills: resource.skills.filter((s) => s.name.trim()),
    })
  }

  const freeHours = Math.max(0, resource.capacityHoursPerWeek - resource.allocatedHoursPerWeek)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Name</span>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={resource.name}
            onChange={(e) => setResource((r) => ({ ...r, name: e.target.value }))}
            placeholder="Maya Chen"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Role</span>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={resource.role}
            onChange={(e) => setResource((r) => ({ ...r, role: e.target.value }))}
            placeholder="Senior Brand Designer"
          />
        </label>
      </div>

      <div>
        <span className="mb-1 block text-sm font-medium text-gray-700">Skills</span>
        <div className="space-y-2">
          {resource.skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                value={skill.name}
                onChange={(e) => updateSkill(i, { name: e.target.value })}
                placeholder="Skill name, e.g. Typography"
              />
              <input
                type="range"
                min={0}
                max={10}
                value={skill.level}
                onChange={(e) => updateSkill(i, { level: Number(e.target.value) })}
                className="w-28"
              />
              <span className="w-6 text-right text-sm tabular-nums text-gray-600">
                {skill.level}
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
          + Add skill
        </button>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">
          Growth areas <span className="font-normal text-gray-400">(skills they want to develop)</span>
        </span>
        <TagInput
          tags={resource.growthAreas}
          onChange={(growthAreas) => setResource((r) => ({ ...r, growthAreas }))}
          placeholder="Type a skill, press Enter"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Capacity (hrs/week)</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={resource.capacityHoursPerWeek}
            onChange={(e) =>
              setResource((r) => ({ ...r, capacityHoursPerWeek: Number(e.target.value) }))
            }
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">
            Already allocated (hrs/week)
          </span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={resource.allocatedHoursPerWeek}
            onChange={(e) =>
              setResource((r) => ({ ...r, allocatedHoursPerWeek: Number(e.target.value) }))
            }
          />
        </label>
      </div>
      <p className="text-xs text-gray-500">Free capacity: {freeHours} hrs/week</p>

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
