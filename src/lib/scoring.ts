import type { CategoryScore, ProjectTask, Resource, ResourceScore } from '../types'

const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/** How well a resource's skills cover a task's required skills, weighted by importance. */
export function scoreSkills(resource: Resource, task: ProjectTask): number {
  if (task.requiredSkills.length === 0) return 10

  const levelByName = new Map(
    resource.skills.map((s) => [s.name.trim().toLowerCase(), s.level]),
  )

  let weightedLevel = 0
  let weightedMax = 0
  for (const req of task.requiredSkills) {
    const level = levelByName.get(req.name.trim().toLowerCase()) ?? 0
    weightedLevel += level * req.importance
    weightedMax += 10 * req.importance
  }

  if (weightedMax === 0) return 10
  return clamp((weightedLevel / weightedMax) * 10, 0, 10)
}

/** How well a task matches a resource's stated growth areas (stretch opportunity). */
export function scoreGrowth(resource: Resource, task: ProjectTask): number {
  if (task.growthTags.length === 0) return 5 // neutral: no explicit growth angle either way

  const growthSet = new Set(resource.growthAreas.map((g) => g.trim().toLowerCase()))
  if (growthSet.size === 0) return 5

  const matches = task.growthTags.filter((tag) => growthSet.has(tag.trim().toLowerCase())).length
  return clamp((matches / task.growthTags.length) * 10, 0, 10)
}

/** How much spare bandwidth a resource currently has, regardless of this task. */
export function scoreCapacity(resource: Resource): number {
  if (resource.capacityHoursPerWeek <= 0) return 0
  const free = resource.capacityHoursPerWeek - resource.allocatedHoursPerWeek
  return clamp((free / resource.capacityHoursPerWeek) * 10, 0, 10)
}

/** Whether the resource's free time is enough to hit the task deadline. */
export function scoreDeadline(
  resource: Resource,
  task: ProjectTask,
): { score: number; weeksUntilDeadline: number; requiredWeeks: number } {
  const freeHours = Math.max(0, resource.capacityHoursPerWeek - resource.allocatedHoursPerWeek)
  const now = Date.now()
  const deadlineTime = new Date(task.deadline).getTime()
  const weeksUntilDeadline = (deadlineTime - now) / MS_PER_WEEK

  if (task.estimatedHours <= 0) {
    return { score: 10, weeksUntilDeadline, requiredWeeks: 0 }
  }
  if (Number.isNaN(deadlineTime) || weeksUntilDeadline <= 0) {
    return { score: 0, weeksUntilDeadline: Math.max(0, weeksUntilDeadline), requiredWeeks: Infinity }
  }
  if (freeHours <= 0) {
    return { score: 0, weeksUntilDeadline, requiredWeeks: Infinity }
  }

  const requiredWeeks = task.estimatedHours / freeHours
  // Comfortably ahead of schedule (>=1.2x the needed time) maxes out the score.
  const ratio = weeksUntilDeadline / requiredWeeks
  const score = clamp((ratio / 1.2) * 10, 0, 10)
  return { score, weeksUntilDeadline, requiredWeeks }
}

export function scoreResourceForTask(resource: Resource, task: ProjectTask): ResourceScore {
  const skills = scoreSkills(resource, task)
  const growth = scoreGrowth(resource, task)
  const capacity = scoreCapacity(resource)
  const deadline = scoreDeadline(resource, task)

  const scores: CategoryScore = {
    skills,
    growth,
    capacity,
    deadline: deadline.score,
  }

  const total = (scores.skills + scores.growth + scores.capacity + scores.deadline) / 4

  return {
    resource,
    scores,
    total,
    freeHoursPerWeek: Math.max(0, resource.capacityHoursPerWeek - resource.allocatedHoursPerWeek),
    weeksUntilDeadline: deadline.weeksUntilDeadline,
    requiredWeeks: deadline.requiredWeeks,
    feasible: deadline.requiredWeeks <= deadline.weeksUntilDeadline,
  }
}

/** Ranks every resource for a given task, highest total score first. */
export function rankResourcesForTask(resources: Resource[], task: ProjectTask): ResourceScore[] {
  return resources
    .map((r) => scoreResourceForTask(r, task))
    .sort((a, b) => b.total - a.total)
}
