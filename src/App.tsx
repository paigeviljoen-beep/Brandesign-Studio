import { useState } from 'react'
import type { ProjectTask, Resource } from './types'
import { seedResources, seedTasks } from './data/seed'
import { loadFromStorage, saveToStorage } from './lib/storage'
import ResourceList from './components/ResourceList'
import ResourceForm from './components/ResourceForm'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import AllocationView from './components/AllocationView'
import Modal from './components/Modal'

type Tab = 'allocation' | 'team' | 'projects'

function useSyncedState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => loadFromStorage(key, initial))
  function update(next: T | ((prev: T) => T)) {
    setState((prev) => {
      const value = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
      saveToStorage(key, value)
      return value
    })
  }
  return [state, update] as const
}

export default function App() {
  const [tab, setTab] = useState<Tab>('allocation')
  const [resources, setResources] = useSyncedState<Resource[]>('bs-resources', seedResources)
  const [tasks, setTasks] = useSyncedState<ProjectTask[]>('bs-tasks', seedTasks)

  const [editingResource, setEditingResource] = useState<Resource | 'new' | null>(null)
  const [editingTask, setEditingTask] = useState<ProjectTask | 'new' | null>(null)

  function saveResource(resource: Resource) {
    setResources((prev) => {
      const exists = prev.some((r) => r.id === resource.id)
      return exists ? prev.map((r) => (r.id === resource.id ? resource : r)) : [...prev, resource]
    })
    setEditingResource(null)
  }

  function saveTask(task: ProjectTask) {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === task.id)
      return exists ? prev.map((t) => (t.id === task.id ? task : t)) : [...prev, task]
    })
    setEditingTask(null)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'allocation', label: 'Allocation' },
    { id: 'team', label: 'Team' },
    { id: 'projects', label: 'Projects' },
  ]

  return (
    <div className="min-h-screen bg-[#f6f5f8]">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <h1 className="text-xl font-semibold text-gray-900">Resource Allocator</h1>
          <p className="text-sm text-gray-500">
            Score team members on skills, growth fit, capacity, and deadline pressure — the
            highest score is the recommended pick for each project.
          </p>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 px-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium ${
                tab === t.id
                  ? 'border-violet-600 text-violet-700'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-6">
        {tab === 'allocation' && <AllocationView resources={resources} tasks={tasks} />}

        {tab === 'team' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditingResource('new')}
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
              >
                + Add team member
              </button>
            </div>
            <ResourceList
              resources={resources}
              onEdit={(r) => setEditingResource(r)}
              onDelete={(id) => setResources((prev) => prev.filter((r) => r.id !== id))}
            />
          </div>
        )}

        {tab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditingTask('new')}
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
              >
                + Add project / task
              </button>
            </div>
            <TaskList
              tasks={tasks}
              onEdit={(t) => setEditingTask(t)}
              onDelete={(id) => setTasks((prev) => prev.filter((t) => t.id !== id))}
            />
          </div>
        )}
      </main>

      {editingResource && (
        <Modal
          title={editingResource === 'new' ? 'Add team member' : 'Edit team member'}
          onClose={() => setEditingResource(null)}
        >
          <ResourceForm
            initial={editingResource === 'new' ? undefined : editingResource}
            onSave={saveResource}
            onCancel={() => setEditingResource(null)}
          />
        </Modal>
      )}

      {editingTask && (
        <Modal
          title={editingTask === 'new' ? 'Add project / task' : 'Edit project / task'}
          onClose={() => setEditingTask(null)}
        >
          <TaskForm
            initial={editingTask === 'new' ? undefined : editingTask}
            onSave={saveTask}
            onCancel={() => setEditingTask(null)}
          />
        </Modal>
      )}
    </div>
  )
}
